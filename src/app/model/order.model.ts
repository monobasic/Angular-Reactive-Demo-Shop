import { CartItem } from '../cart/shared/cart-item.model';
import { Customer } from './customer.model';

export class Order {
    number: number;
    date: string;
    shippingMethod: string;
    paymentMethod: string;
    items: CartItem[];
    customer: Customer;
}
