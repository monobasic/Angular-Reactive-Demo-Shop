import { Product } from '../products/shared/product.model';

export class CartService {
  private cartItems: Product[] = [];

  constructor() { }

  getItems() {
    return this.cartItems.slice();
  }

  addItem(product: Product) {
    this.cartItems.push(product);
  }

  clearCart() {
    this.cartItems = [];
  }

}
