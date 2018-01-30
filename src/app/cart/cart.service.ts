import { EventEmitter } from '@angular/core';
import { Product } from '../products/shared/product.model';

export class CartService {
  private cartItems: Product[] = [];
  public itemsChanged: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  constructor() { }

  getItems() {
    return this.cartItems.slice();
  }

  addItem(product: Product) {
    this.cartItems.push(product);
    this.itemsChanged.emit(this.cartItems.slice());
  }

  addItems(products: Product[]) {
    this.cartItems.push(...products);
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
