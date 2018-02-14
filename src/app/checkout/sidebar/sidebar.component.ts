import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-checkout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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
