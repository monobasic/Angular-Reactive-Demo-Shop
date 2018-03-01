import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../models/order.model';
import { MessageService } from '../messages/message.service';

@Injectable()
export class OrderService {
  private orders: Order[];
  public ordersChanged: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  constructor(private messageService: MessageService) { }

  getOrders() {
    return this.orders.slice();
  }

  getOrder(number: number) {
    return this.orders.filter(order => order.number === number);
  }

  addOrder(order: Order) {
    this.orders.push(order);
  }

  removeOrder(number: number) {
    const indexToRemove = this.orders.findIndex(element => element.number === number);
    this.orders.splice(indexToRemove, 1);
    this.ordersChanged.emit(this.orders.slice());
    this.messageService.add('Removed order: ' + number);
  }
}
