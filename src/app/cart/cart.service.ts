import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../products/shared/product.model';
import { CartItem } from './shared/cart-item.model';
import { MessageService } from '../core/messages/message.service';

@Injectable()
export class CartService {
  // Init and generate some fixtures
  private cartItems: CartItem[] = [];
  public itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

  constructor(private messageService: MessageService) { }

  getItems() {
    return this.cartItems.slice();
  }

  // Get Product ids out of CartItem[] in a new array
  private getItemIds() {
    return this.getItems().map(cartItem => cartItem.product.id);
  }

  addItem(item: CartItem) {
    // If item is already in cart, add to the amount, otherwise push item into cart
    if (this.getItemIds().includes(item.product.id)) {
      this.cartItems.forEach(function (cartItem) {
        if (cartItem.product.id === item.product.id) {
          cartItem.amount += item.amount;
        }
      });
      this.itemsChanged.emit(this.cartItems.slice());
      this.messageService.add('Amount in cart changed for: ' + item.product.name);
    } else {
      this.cartItems.push(item);
      this.itemsChanged.emit(this.cartItems.slice());
      this.messageService.add('Added to cart: ' + item.product.name);
    }
  }

  addItems(items: CartItem[]) {
    this.cartItems.push(...items);
    this.itemsChanged.emit(this.cartItems.slice());
  }

  removeItem(item: CartItem) {
    const indexToRemove = this.cartItems.findIndex((element) => {
      return element === item;
    });
    this.cartItems.splice(indexToRemove, 1);
    this.itemsChanged.emit(this.cartItems.slice());
  }

  clearCart() {
    this.cartItems = [];
    this.itemsChanged.emit(this.cartItems.slice());
  }

}
