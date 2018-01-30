import { EventEmitter } from '@angular/core';
import { Product } from '../products/shared/product.model';
import { CartItem } from './shared/cart-item.model';

export class CartService {
  private cartItems: CartItem[];
  public itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

  constructor() { }

  getItems() {
    return this.cartItems.slice();
  }

  addItem(item: CartItem) {
    this.cartItems.push(item);
    this.itemsChanged.emit(this.cartItems.slice());
  }

  addItems(items: CartItem[]) {
    this.cartItems.push(...items);
    this.itemsChanged.emit(this.cartItems.slice());
  }

  removeItem(id: number) {
    this.cartItems.splice(id, 1);
    this.itemsChanged.emit(this.cartItems.slice());
  }

  clearCart() {
    this.cartItems = [];
    this.itemsChanged.emit(this.cartItems.slice());
  }

}
