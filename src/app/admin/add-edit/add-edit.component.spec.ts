import { TestBed, inject } from '@angular/core/testing';
import { AddEditComponent, DomainProduct } from './add-edit.component';

import { Product } from '../../models/product.model';

import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../products/shared/file-upload.service';
import { MessageService } from '../../messages/message.service';
import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';

class MockRouter {}
class MockActivatedRoute {}
class MockProductService {}
class MockFileUploadService {}
class MockProductsCacheService {}
class MockMessageService {}

describe('AddEditComponent', () => {
  let addEditComponent: AddEditComponent;

  beforeEach(() => {
    // const spy = jasmine.createSpyObj('MessageService', ['add', 'addError']);

    TestBed.configureTestingModule({
      providers: [
        AddEditComponent,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: MessageService, useClass: MockMessageService },
        { provide: ProductService, useClass: MockProductService },
        { provide: FileUploadService, useClass: MockFileUploadService },
        { provide: ProductsCacheService, useClass: MockProductsCacheService }
      ]
    });
    addEditComponent = TestBed.get(AddEditComponent);
  });

  it('should be created', () => {
    expect(addEditComponent).toBeTruthy();
  });

  describe('has a method constructProductToSubmit, it', () => {
    it('should turn a DomainProduct to a Product', () => {
      const testDomainProduct = new DomainProduct(
        1,
        new Date().toISOString().split('T')[0],
        '',
        '',
        0,
        0,
        0,
        [],
        [],
        'hello, world',
      );

      const result = addEditComponent.constructProductToSubmit(testDomainProduct);
      expect(result.categories).toEqual({hello: true, world: true});
    });
  });

  describe('has a method createId, it', () => {
    it('returns a random id if provided product id is 1', () => {
      const testProduct = new Product(
        1,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        100,
        200,
        10
      );
      const result = addEditComponent.createId(testProduct);
      expect(result).toBeGreaterThan(1);
    });

    it('returns the same id if provided product id is  greater 1', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        100,
        200,
        10
      );
      const result = addEditComponent.createId(testProduct);
      expect(result).toBe(666);
    });
  });

  describe('has a method categoriesFromObjectToString', () => {
    it('should return "example, category" if provided an empty object', () => {
      const result = addEditComponent.categoriesFromObjectToString({});
      expect(result).toBe('example, category');
    });

    it('should turn "key: boolean"-objects into comma-seperated strings', () => {
      const result = addEditComponent.categoriesFromObjectToString({
        test: true,
        test2: true
      });
      expect(result).toEqual('test,test2');
    });
  });

  describe('has a method categoriesFromStringToObject, it', () => {
    it('should turn empty strings to empty objects', () => {
      const result = addEditComponent.categoriesFromStringToObject('');
      expect(result).toEqual({});
    });

    it('should turn strings to "key: true"-objects', () => {
      const result = addEditComponent.categoriesFromStringToObject(
        'test, test2'
      );
      expect(result).toEqual({ test: true, test2: true });
    });
  });

  describe('has a method checkForSale, it', () => {
    it('should return true if provided a value > 0', () => {
      const result = addEditComponent.checkForSale(1);
      expect(result).toBe(true);
    });

    it('should return false if provided 0', () => {
      const result = addEditComponent.checkForSale(0);
      expect(result).toBe(false);
    });
  });

  describe('has a method calculateReduction, it', () => {
    it('should calculate the correct reduction', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        100,
        200,
        10,
        ['/hello-world.jpg']
      );
      const result = addEditComponent.calculateReduction(
        testProduct.priceNormal,
        testProduct.price
      );
      expect(result).toBe(50);
    });

    it('should return 0 if reduction is less than zero', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        199.5,
        200,
        10,
        ['/hello-world.jpg']
      );
      const result = addEditComponent.calculateReduction(
        testProduct.priceNormal,
        testProduct.price
      );
      expect(result).toBe(0);
    });
  });

  describe('has a method handleImageURLs, it', () => {
    it('should return an array if provided a not-empty-array', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        89,
        99,
        10,
        ['/hello-world.jpg']
      );
      const result = addEditComponent.handleImageURLs(testProduct);
      expect(result).toBe(testProduct.imageURLs);
    });

    it('should return an empty array if provided an empty array', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        89,
        99,
        10,
        []
      );
      const result = addEditComponent.handleImageURLs(testProduct);
      expect(result).toEqual([]);
    });
  });
});
