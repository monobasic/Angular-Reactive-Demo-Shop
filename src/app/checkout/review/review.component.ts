import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/shared/cart-item.model';
import { CheckoutService } from '../../checkout.service';
import { Customer } from '../../model/customer.model';
import { Order } from '../../model/order.model';

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

  constructor(private cartService: CartService, private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      }
    );
    this.customer = this.checkoutService.getOrderInProgress().customer;
    this.checkoutService.orderInProgressChanged.subscribe(
      (order: Order) => {
        this.customer = order.customer;
        this.paymentMethod = order.paymentMethod;
      }
    );
  }

  onBack() {
    this.checkoutService.previousStep();
  }

  onCompleteOrder() {
    this.checkoutService.setOrderItems(this.cartService.getItems());

    console.log(this.checkoutService.getOrderInProgress());
    console.log('Create "real" order via Order Service');
    console.log('Goto final confirmation screen..');
  }
}
