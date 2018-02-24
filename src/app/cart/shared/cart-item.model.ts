import { Product } from '../../model/product.model';

export class CartItem {
    constructor(public product: Product, public amount: number) {}
}
