import { Product } from '../../models/product.model';

export class CartItem {
    constructor(public product: Product, public amount: number) {}
}
