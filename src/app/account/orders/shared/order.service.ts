import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { MessageService } from '../../../messages/message.service';
import { AuthService } from '../../shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { tap, take, pluck, flatMap } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class OrderService implements OnInit {
  private orders: Order[];
  private privateOrders$: Subject<Observable<any>> = new Subject();
  public orders$ = this.privateOrders$.asObservable();
  private userId;
  public ordersChanged: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private store: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserUid();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.addError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getOrders(): void {
    this.authService.userUid$.subscribe((userUid) => {
      if (userUid) {
        const remoteUser = `/users/${userUid}`;
        this.store
          .object<User>(remoteUser)
          .valueChanges()
          .pipe(pluck('orders'))
          .subscribe((orders) => {
            this.privateOrders$.next(of(orders));
          });
      }
    });
  }

  public getOrder(number: number) {
    return this.orders.filter((order) => order.number === number.toString());
  }

  private constructOrderMetaData(order: Order) {
    return {
      number: (Math.random() * 10000000000).toString().split('.')[0],
      date: new Date().toString(),
      status: 'In Progress'
    };
  }

  public addUserOrder(order: Order, total: number, user: string) {
    const orderWithMetaData = {
      ...order,
      ...this.constructOrderMetaData(order),
      total
    };

    const databaseOperation = this.store
      .list(`users/${user}/orders`)
      .push(orderWithMetaData)
      .then((response) => response, (error) => error);

    return fromPromise(databaseOperation);
  }

  public addAnonOrder(order: Order, total: number) {
    const orderWithMetaData = {
      ...order,
      ...this.constructOrderMetaData(order),
      total
    };

    const databaseOperation = this.store
      .list('orders')
      .push(orderWithMetaData)
      .then((response) => response, (error) => error);

    return fromPromise(databaseOperation);
  }
}
