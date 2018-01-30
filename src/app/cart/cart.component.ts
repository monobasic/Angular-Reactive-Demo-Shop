import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from './shared/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public items: CartItem[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

}
