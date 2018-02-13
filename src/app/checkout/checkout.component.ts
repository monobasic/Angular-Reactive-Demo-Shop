import { Component, OnInit, ElementRef } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { NgForm } from '@angular/forms';

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

  onSubmit(form: NgForm) {
    console.log('form submit!');
    console.log(form);
  }

}
