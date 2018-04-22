import { Injectable, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFireDatabase } from 'angularfire2/database';

import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';

import { MessageService } from '../../../messages/message.service';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class OrderService {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private store: AngularFireDatabase
  ) {}

  public getOrders() {
    return this.authService.user
      .switchMap((user) => {
        if (user) {
          const remoteUserOrders = `/users/${user.uid}/orders`;
          return this.store.list(remoteUserOrders).valueChanges();
        } else {
          return of(null);
        }
      });
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

  public addAnonymousOrder(order: Order, total: number) {
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
