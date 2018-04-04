import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MessageService } from '../../messages/message.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

describe('CartService Setup', () => {
    let cartService: CartService;
    let messageService: jasmine.SpyObj<MessageService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MessageService', [
            'add',
            'addError'
        ]);

        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: MessageService, useValue: spy }
            ]
        });

        cartService = TestBed.get(CartService);
        messageService = TestBed.get(MessageService);
    });

    it('should be created', () => {
        expect(cartService).toBeTruthy();
    });

    it('init cartItems array', () => {
        expect(cartService.getItems()).toEqual([]);
    });
});

describe('CartService Methods', () => {
    let cartService: CartService;
    let messageService: jasmine.SpyObj<MessageService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MessageService', [
            'add',
            'addError'
        ]);

        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: MessageService, useValue: spy }
            ]
        });

        cartService = TestBed.get(CartService);
        messageService = TestBed.get(MessageService);
    });

    it('addItem()', () => {
        const testProduct = new CartItem(
            new Product(
                666,
                new Date().toISOString().split('T')[0],
                'Foo Product',
                'Lorem Ipsum...',
                89,
                99,
                10,
            ),
            3
        );
        // Add a cart item
        cartService.addItem(testProduct);
        // Check items in cart
        expect(cartService.getItems()).toEqual([
            testProduct
        ]);
    });

});
