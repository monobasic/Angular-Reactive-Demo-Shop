import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from './shared/cart-item.model';
import { MessageService } from '../messages/message.service';

@Injectable()
export class CartService {
  // Init and generate some fixtures
  private cartItems: CartItem[] = [
    new CartItem(
      {
        id: 11,
        name: 'Shoes',
        date: '2017-01-07',
        price: 29.7,
        priceNormal: 99,
        reduction: 70,
        description: 'Hello world',
        imageURLs: ['img/shop/products/01.jpg'],
        categories: ['Shoes']
      }, 1
    ),
    new CartItem(
      {
        id: 12,
        name: 'Bag',
        date: '2017-04-08',
        price: 49,
        priceNormal: 49,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/02.jpg', 'img/shop/products/02.jpg', 'img/shop/products/02.jpg'],
        categories: ['Bags']
      }, 2
    )
  ];

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
    items.forEach(function(cartItem) {
      this.addItem(cartItem);
    });
  }

  removeItem(item: CartItem) {
    const indexToRemove = this.cartItems.findIndex(element => element === item);
    this.cartItems.splice(indexToRemove, 1);
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Deleted from cart: ' + item.product.name);
  }

  updateItemAmount(item: CartItem, newAmount: number) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        cartItem.amount = newAmount;
      }
    });
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Updated amount for: ' + item.product.name);
  }

  clearCart() {
    this.cartItems = [];
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Cleared cart');
  }

  getTotal() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.amount * cartItem.product.price;
    });
    return total;
  }

}
