import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MessageService } from '../../messages/message.service';


describe('CartService', () => {
    beforeEach(() => {
        const spy = jest.fn();

        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: MessageService, useValue: spy }
            ]
        });
    });

    it('should be created', inject([CartService], (service: CartService) => {
        expect(service).toBeTruthy();
    }));
});
