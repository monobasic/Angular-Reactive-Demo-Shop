import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MessageService } from '../../messages/message.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';


describe('CartService Init', () => {
    beforeEach(() => {
        const messageServiceSpy = jest.fn();

        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: MessageService, useValue: messageServiceSpy }
            ]
        });
    });

    it('should be created', inject([CartService], (service: CartService) => {
        expect(service).toBeTruthy();
    }));

    it('should have init cartItems', inject([CartService], (service: CartService) => {
        expect(service.getItems()).toEqual([]);
    }));
});


describe('CartService Methods', () => {
    beforeEach(() => {
        const messageServiceMock = jest.mock('../../messages/message.service');
        messageServiceMock.clearAllMocks();

        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: MessageService, useValue: messageServiceMock }
            ]
        });
    });

    it('Add some products', inject([CartService], (service: CartService) => {
        service.addItem(new CartItem(
            new Product(
                666,
                new Date().toISOString().split('T')[0],
                'Test Product',
                'Lorem  Ipsum...',
                39,
                39
            ),
            3
        ));
    }));

});
