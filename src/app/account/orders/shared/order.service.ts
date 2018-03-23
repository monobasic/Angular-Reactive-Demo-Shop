import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { MessageService } from '../../../messages/message.service';
import { AuthService } from '../../shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { tap, take } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService implements OnInit {
  private orders: Order[];
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

  getOrders() {
    return this.orders.slice();
  }

  getOrder(number: number) {
    return this.orders.filter((order) => order.number === number);
  }

  addOrder(order: Order) {
    const user = `/users/${this.authService.getUserUid()}`;

    return this.store
      .object<User>(user)
      .valueChanges()
      .pipe(
        tap((userRecord) => {
          userRecord.orders = userRecord.orders || [];
          userRecord.orders[
            (Math.random() * 10000000000).toString().split('.')[0]
          ] = order;
          return of(
            this.store
              .object<User>(user)
              .set(userRecord)
              .then((res) => res)
              .catch((error) => console.log(error))
          );
        })
      );
  }

  removeOrder(number: number) {
    const indexToRemove = this.orders.findIndex(
      (element) => element.number === number
    );
    this.orders.splice(indexToRemove, 1);
    this.ordersChanged.emit(this.orders.slice());
    this.messageService.add('Removed order: ' + number);
  }
}
