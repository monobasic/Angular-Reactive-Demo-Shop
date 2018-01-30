import { Product } from '../../products/shared/product.model';

export class CartItem {
    constructor(public product: Product, public amount: number) {}
}
