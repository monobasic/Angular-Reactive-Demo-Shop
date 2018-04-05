import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MessageService } from '../../messages/message.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

describe('CartService', () => {
  describe('Setup', () => {
    let cartService: CartService;
    let messageService: jasmine.SpyObj<MessageService>;

    beforeEach(() => {
      const spy = jasmine.createSpyObj('MessageService', ['add', 'addError']);

      TestBed.configureTestingModule({
        providers: [CartService, { provide: MessageService, useValue: spy }]
      });

      cartService = TestBed.get(CartService);
      messageService = TestBed.get(MessageService);
    });

    it('should create cartService', () => {
      expect(cartService).toBeTruthy();
    });

    it('should init cartItems array', () => {
      expect(cartService.getItems()).toEqual([]);
    });
  });

  describe('method', () => {
    let cartService: CartService;
    let messageService: jasmine.SpyObj<MessageService>;

    beforeEach(() => {
      const spy = jasmine.createSpyObj('MessageService', ['add', 'addError']);

      TestBed.configureTestingModule({
        providers: [CartService, { provide: MessageService, useValue: spy }]
      });

      cartService = TestBed.get(CartService);
      messageService = TestBed.get(MessageService);
    });

    it('addItem() should add 3 of the same products at once', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        89,
        99,
        10
      );

      spyOn(cartService.itemsChanged, 'emit');

      // Add a cart item
      cartService.addItem(new CartItem(testProduct, 3));

      // Check items in cart
      expect(cartService.getItems()).toEqual([new CartItem(testProduct, 3)]);

      expect(cartService.itemsChanged.emit).toHaveBeenCalled();
      expect(messageService.add).toHaveBeenCalled();
    });

    it('addItem() called twice with the same product should increase amount', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        89,
        99,
        10
      );

      spyOn(cartService.itemsChanged, 'emit');

      // Add a cart item
      cartService.addItem(new CartItem(testProduct, 1));

      // Check items in cart
      expect(cartService.getItems()).toEqual([new CartItem(testProduct, 1)]);

      expect(cartService.itemsChanged.emit).toHaveBeenCalled();
      expect(messageService.add).toHaveBeenCalled();

      // Add another of the same cart item
      cartService.addItem(new CartItem(testProduct, 1));

      // Check items in cart
      expect(cartService.getItems()).toEqual([new CartItem(testProduct, 2)]);

      expect(cartService.itemsChanged.emit).toHaveBeenCalledTimes(2);
      expect(messageService.add).toHaveBeenCalledTimes(2);
    });

    it('addItems() should be able to handle 3 products in array at once', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        89,
        99,
        10
      );

      const testArray = [
        new CartItem(testProduct, 1),
        new CartItem(testProduct, 2),
        new CartItem(testProduct, 3)
      ];

      spyOn(cartService, 'addItem').and.callThrough();

      // Add a cart item
      cartService.addItems(testArray);

      // Check items in cart
      expect(cartService.addItem).toHaveBeenCalledTimes(3);
      expect(messageService.add).toHaveBeenCalledTimes(3);
      expect(cartService.getItems()).toEqual([new CartItem(testProduct, 6)]);
    });

    it('removeItem() should remove a distinct item', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        89,
        99,
        10
      );

      spyOn(cartService.itemsChanged, 'emit');

      // Add a cart item
      cartService.addItem(new CartItem(testProduct, 3));

      // Check items in cart
      expect(cartService.getItems()).toEqual([new CartItem(testProduct, 3)]);

      expect(cartService.itemsChanged.emit).toHaveBeenCalled();
      expect(messageService.add).toHaveBeenCalled();

      // Remove item
      cartService.removeItem(new CartItem(testProduct, 1));

      expect(cartService.itemsChanged.emit).toHaveBeenCalled();
      expect(messageService.add).toHaveBeenCalled();
      expect(cartService.getItems()).toEqual([]);
    });
  });
});
