import { Component, OnInit } from '@angular/core';

import { CartService } from '../../cart/shared/cart.service';

@Component({
  selector: 'app-checkout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public cartSubtotal: number;
  public shipping: number;
  public orderTotal: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubtotal = this.cartService.getTotal();
    // TODO: shipping, hardcoded for now
    this.shipping = 9;
    this.orderTotal = this.cartSubtotal + this.shipping;
  }
}
