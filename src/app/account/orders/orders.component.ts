import { Component, OnInit } from '@angular/core';
import { OrderService } from './shared/order.service';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  CurrencyPipe
} from '@angular/common';
import { Order } from '../../models/order.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: Order[];
  private ordersSubscription: Subscription;

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.ordersSubscription = this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
