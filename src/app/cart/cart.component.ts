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
    this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
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
    item.amount++;
  }

  decreaseAmount(item: CartItem) {
    item.amount--;
    if (item.amount < 0) {
      item.amount = 0;
    }
  }

}
