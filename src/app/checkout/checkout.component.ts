import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartSubtotal: number;
  shipping: number;
  orderTotal: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartSubtotal = this.cartService.getTotal();
    // TODO: shipping
    this.shipping = 9;
    this.orderTotal = this.cartSubtotal + this.shipping;
  }

}
