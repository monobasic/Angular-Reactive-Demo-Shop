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

@Injectable()
export class OrderService implements OnInit {
  private orders: Order[];
  private privateOrders$: Subject<Observable<Order[]>> = new Subject();
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

  getOrders(): void {
    this.authService.userUid$.subscribe((userUid) => {
      if (userUid) {
        const remoteUser = `/users/${userUid}`;
        this.store
          .object<User>(remoteUser)
          .valueChanges()
          .pipe(pluck('orders'))
          .subscribe((orders: Order[]) => {
            this.privateOrders$.next(of(orders));
          });
      }
    });
  }

  getOrder(number: number) {
    return this.orders.filter((order) => order.number === number.toString());
  }

  addOrder(order: Order) {
    const userUid = this.authService.getUserUid();
    const user = `/users/${userUid}`;
    order.number = (Math.random() * 10000000000).toString().split('.')[0];
    order.date = new Date().toString();
    order.status = 'In Progress';
    order.total = order.items.reduce((sum, item) => {
      sum += item.product.price;
      return sum;
    }, 0);

    if (userUid) {
      return this.store
        .object<User>(user)
        .snapshotChanges().take(1)
        .pipe(
          flatMap((userRecord) => {
            const currentUser = userRecord.payload.val();
            currentUser.orders = currentUser.orders || [];
            currentUser.orders.push(order);

            // TODO: USE UPDATE INSTEAD OF SET
            const dbPromise = this.store.object<User>(user).set(currentUser);

            return dbPromise;
          })
        );
    } else {
      this.store
        .list('orders')
        .push(order)
        .then(
          (val) => Promise.resolve(val),
          (error) => {
            this.messageService.addError('could not submit your order');
            Promise.reject(error);
          }
        );
      return of(null);
    }
  }

  removeOrder(number: number) {
    const indexToRemove = this.orders.findIndex(
      (element) => element.number === number.toString()
    );
    this.orders.splice(indexToRemove, 1);
    this.ordersChanged.emit(this.orders.slice());
    this.messageService.add('Removed order: ' + number);
  }
}
