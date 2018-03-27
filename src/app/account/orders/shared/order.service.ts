import { Injectable, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operator/map';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AngularFireDatabase } from 'angularfire2/database';

import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';

import { MessageService } from '../../../messages/message.service';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class OrderService {
  private privateOrders$: BehaviorSubject<
    Observable<any>
  > = new BehaviorSubject(of(null));
  public orders$ = this.privateOrders$.asObservable();

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private store: AngularFireDatabase
  ) {}

  public getOrders() {
    this.authService.userUid$
      .pipe(
        tap((userUid) => {
          if (userUid) {
            const remoteUserOrders = `/users/${userUid}/orders`;
            const dbOperation = this.store
              .list(remoteUserOrders)
              .valueChanges();

            this.privateOrders$.next(dbOperation);
          }
        })
      )
      .subscribe((val) => console.log(val), (error) => console.log(error));
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

  private constructOrderMetaData(order: Order) {
    return {
      number: (Math.random() * 10000000000).toString().split('.')[0],
      date: new Date().toString(),
      status: 'In Progress'
    };
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
}
