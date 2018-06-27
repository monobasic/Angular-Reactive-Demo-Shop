import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  CurrencyPipe
} from '@angular/common';

import { Subscription } from 'rxjs';

import { OrderService } from './shared/order.service';

import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders: Order[];
  private ordersSubscription: Subscription;

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.ordersSubscription = this.orderService
      .getOrders()
      .subscribe((orders: Order[]) => {
        if (orders) {
          this.orders = orders.reverse();
        }
      });
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
}
