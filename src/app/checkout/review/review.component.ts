import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../cart/shared/cart.service';
import { CartItem } from '../../cart/shared/cart-item.model';
import { CheckoutService } from '../shared/checkout.service';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../account/orders/shared/order.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  items: CartItem[];
  total: number;
  customer: Customer;
  paymentMethod: string;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.itemsChanged.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
    this.customer = this.checkoutService.getOrderInProgress().customer;
    this.checkoutService.orderInProgressChanged.subscribe((order: Order) => {
      this.customer = order.customer;
      this.paymentMethod = order.paymentMethod;
    });
  }

  onBack() {
    this.checkoutService.previousStep();
  }

  onCompleteOrder() {
    this.checkoutService.setOrderItems(this.cartService.getItems());
    console.log(this.checkoutService.getOrderInProgress());

    console.log('Create "real" order via Order Service:');
    this.orderService
      .addOrder(this.checkoutService.getOrderInProgress())
      .take(1)
      .subscribe(res => console.log(res));

    console.log('Goto final confirmation screen..');
  }
}
