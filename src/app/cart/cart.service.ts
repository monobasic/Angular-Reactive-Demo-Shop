import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../products/shared/product.model';
import { CartItem } from './shared/cart-item.model';
import { MessageService } from '../core/messages/message.service';

@Injectable()
export class CartService {
  private cartItems: CartItem[] = [
    new CartItem(
      {
        id: 11,
        name: 'Shoes',
        price: 99,
        reduction: 70,
        description: 'Hello world',
        imageURLs: ['img/shop/products/01.jpg'],
        ratingIDs: [1],
        reviewIDs: [],
        sizes: [9, 10, 11],
        colors: ['mauve', 'taube', 'mint'],
        categoryIDs: [1, 2, 3]
      }, 1
    ),
    new CartItem(
      {
        id: 12,
        name: 'Bag',
        price: 99,
        description: 'Hello world',
        imageURLs: ['img/shop/products/02.jpg'],
        ratingIDs: [],
        reviewIDs: [],
        sizes: [],
        colors: ['mauve', 'taube', 'mint'],
        categoryIDs: [1, 2, 3]
      }, 2
    )
  ];
  public itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

  constructor(private messageService: MessageService) { }

  getItems() {
    return this.cartItems.slice();
  }

  addItem(item: CartItem) {
    // TODO: check for already exising items and merge amount
    this.cartItems.push(item);
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Added to cart: ' + item.product.name);
    console.log(this.cartItems);
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
