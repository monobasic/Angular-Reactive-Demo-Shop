import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../account/shared/auth.service';
import { CheckoutService } from '../shared/checkout.service';
import { CartService } from '../../cart/shared/cart.service';
import { MessageService } from '../../messages/message.service';
import { OrderService } from '../../account/orders/shared/order.service';

import { CartItem } from '../../models/cart-item.model';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  items: CartItem[];
  total: number;
  customer: Customer;
  paymentMethod: string;
  unsubscribe$ = new Subject();
  user: User;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);

    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.itemsChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      });
    this.customer = this.checkoutService.getOrderInProgress().customer;
    this.checkoutService.orderInProgressChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((order: Order) => {
        this.customer = order.customer;
        this.paymentMethod = order.paymentMethod;
      });
  }

  public onBack() {
    this.checkoutService.previousStep();
  }

  public onCompleteOrder() {
    const userUid = this.user ? this.user.uid : false;
    const order = this.checkoutService.getOrderInProgress();
    const total = this.cartService.getTotal();

    this.checkoutService.setOrderItems(this.cartService.getItems());

    if (userUid) {
      this.submitUserOrder(order, total, userUid);
    } else {
      this.submitAnonOrder(order, total);
    }
  }

  private submitUserOrder(order, total, userUid) {
    this.orderService
      .addUserOrder(order, total, userUid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Could not submit order, try again.');
        }
      );
  }

  private submitAnonOrder(order, total) {
    this.orderService
      .addAnonymousOrder(order, total)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Could not submit order, try again.');
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
