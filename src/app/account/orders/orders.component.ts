import { Component, OnInit } from '@angular/core';
import { OrderService } from './shared/order.service';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  CurrencyPipe
} from '@angular/common';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { concatMap, tap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operator/mergeMap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders$: Observable<any>;

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders();
    this.orderService.orders$.subscribe(orders => {
      this.orders$ = orders;
    });
  }
}
