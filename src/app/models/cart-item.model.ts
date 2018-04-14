import { Product } from './product.model';

export class CartItem {
  constructor(public product: Product, public amount: number) {}
}
