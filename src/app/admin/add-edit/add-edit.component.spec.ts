import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs/observable/of';

import { AddEditComponent, DomainProduct } from './add-edit.component';

import { FileUploadService } from '../../products/shared/file-upload.service';
import { MessageService } from '../../messages/message.service';
import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';

import { Product } from '../../models/product.model';

class MockRouter {}
class MockActivatedRoute {
  params;
  snapshot;
  constructor() {
    this.params = of(100);
    this.snapshot = {
      paramMap: {
        get: (key) => 100
      }
    };
  }
}
class MockProductService {}
class MockFileUploadService {}
class MockProductsCacheService {}
class MockMessageService {}

describe('AddEditComponent', () => {
  let addEditComponent: AddEditComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddEditComponent,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: MessageService, useClass: MockMessageService },
        { provide: ProductService, useClass: MockProductService },
        { provide: FileUploadService, useClass: MockFileUploadService },
        { provide: ProductsCacheService, useClass: MockProductsCacheService}
      ]
    });
    addEditComponent = TestBed.get(AddEditComponent);
  });

  it('should be created', () => {
    expect(addEditComponent).toBeTruthy();
  });

  describe('has a method setProduct, it', () => {
    it('should set mode to edit if id is provided', () => {
      spyOn<any>(addEditComponent, 'getProduct');
      addEditComponent['setProduct']();

      expect(addEditComponent['getProduct']).toHaveBeenCalled();
      expect(addEditComponent['mode']).toEqual('edit');
    });

    it('should set mode to add if no id is provided', () => {
      spyOn<any>(addEditComponent, 'constructProduct');
      addEditComponent.route.snapshot.paramMap.get = () => null;

      addEditComponent['setProduct']();
      expect(addEditComponent['mode']).toBe('add');
    });
  });

  it('should have a working method constructProduct', () => {
    spyOn<any>(addEditComponent, 'initForm');

    addEditComponent['constructProduct']();

    expect(addEditComponent['initForm']).toHaveBeenCalled();
    expect(addEditComponent.product.categories).toEqual('example, category');
  });

  it('should have a working method initForm', () => {
    spyOn<any>(addEditComponent, 'onFormChanges');

    addEditComponent['initForm']();

    expect(addEditComponent.productForm).toBeTruthy();
    expect(addEditComponent['onFormChanges']).toHaveBeenCalled();
  });

  it('should have a working method syncProduct', () => {
    const testDomainProduct = new DomainProduct(
      1,
      new Date().toISOString().split('T')[0],
      'My name',
      'My new description',
      100,
      200,
      0,
      ['/my-image'],
      [],
      'hello, world'
    );
    const result = addEditComponent['syncProduct'](testDomainProduct);
    expect(addEditComponent.product.description).toEqual('My new description');
    expect(addEditComponent.product.name).toEqual('My name');
    expect(addEditComponent.product.id).toBeGreaterThan(1);
    expect(addEditComponent.product.reduction).toBe(50);
    expect(addEditComponent.product.sale).toBe(true);
    expect(addEditComponent.product.imageURLs).toEqual(['/my-image']);
  });

  it('should have a working method constructMockProduct', () => {
    const result = addEditComponent['constructMockProduct']();
    expect(result.id).toBe(1);
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
        'hello, world'
      );

      const result = addEditComponent['constructProductToSubmit'](
        testDomainProduct
      );
      expect(result.categories).toEqual({ hello: true, world: true });
    });
  });

  describe('has a method createId, it', () => {
    it('should return a random id if provided product id is 1', () => {
      const testProduct = new Product(
        1,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        100,
        200,
        10
      );
      const result = addEditComponent['createId'](testProduct);
      expect(result).toBeGreaterThan(1);
    });

    it('should return the same id if provided product id is  greater 1', () => {
      const testProduct = new Product(
        666,
        new Date().toISOString().split('T')[0],
        'Foo Product',
        'Lorem Ipsum...',
        100,
        200,
        10
      );
      const result = addEditComponent['createId'](testProduct);
      expect(result).toBe(666);
    });
  });

  describe('has a method categoriesFromObjectToString, it', () => {
    it('should return "example, category" if provided an empty object', () => {
      const result = addEditComponent['categoriesFromObjectToString']({});
      expect(result).toBe('example, category');
    });

    it('should turn "key: boolean"-objects into comma-seperated strings', () => {
      const result = addEditComponent['categoriesFromObjectToString']({
        test: true,
        test2: true
      });
      expect(result).toEqual('test,test2');
    });
  });

  describe('has a method categoriesFromStringToObject, it', () => {
    it('should turn empty strings to empty objects', () => {
      const result = addEditComponent['categoriesFromStringToObject']('');
      expect(result).toEqual({});
    });

    it('should turn strings to "key: true"-objects', () => {
      const result = addEditComponent['categoriesFromStringToObject'](
        'test, test2'
      );
      expect(result).toEqual({ test: true, test2: true });
    });
  });

  describe('has a method checkForSale, it', () => {
    it('should return true if provided a value > 0', () => {
      const result = addEditComponent['checkForSale'](1);
      expect(result).toBe(true);
    });

    it('should return false if provided 0', () => {
      const result = addEditComponent['checkForSale'](0);
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
      const result = addEditComponent['calculateReduction'](
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
      const result = addEditComponent['calculateReduction'](
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
      const result = addEditComponent['handleImageURLs'](testProduct);
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
      const result = addEditComponent['handleImageURLs'](testProduct);
      expect(result).toEqual([]);
    });
  });
});
