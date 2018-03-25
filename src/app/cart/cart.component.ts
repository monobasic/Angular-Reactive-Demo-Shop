import { Component, OnInit } from '@angular/core';
import { CartService } from './shared/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public items: CartItem[];
  public total: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      }
    );
  }

  onClearCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart();
  }

  onRemoveItem(event, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  increaseAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, item.amount + 1);
  }

  decreaseAmount(item: CartItem) {
    const newAmount = (item.amount === 1) ?  1 : item.amount - 1;
    this.cartService.updateItemAmount(item, newAmount);
  }

  checkAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, (item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount));
  }

}
