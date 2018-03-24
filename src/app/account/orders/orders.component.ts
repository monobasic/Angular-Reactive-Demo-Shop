import { Component, OnInit } from '@angular/core';
import { OrderService } from './shared/order.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders$: Observable<Order[]>;

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders();
    this.orderService.orders$.subscribe(orders => {
      this.orders$ = orders;
    });
  }
}
