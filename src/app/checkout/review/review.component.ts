import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../cart/shared/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CheckoutService } from '../shared/checkout.service';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../account/orders/shared/order.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
    private orderService: OrderService,
    private router: Router
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

    const order = this.checkoutService.getOrderInProgress();

    this.orderService
      .addOrder(order)
      .take(1)
      .subscribe((res) => {
        this.cartService.clearCart();
        this.router.navigate(['/order-complete']);
      });
    }
}
