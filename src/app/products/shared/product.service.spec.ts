import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';
import { Product } from '../../models/product.model';

class MockAuthService {}

describe('ProductService', () => {
  let productService: ProductService;
  let angularFireDatabase: AngularFireDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: Router },
        { provide: MessageService },
        { provide: AngularFireDatabase },
        { provide: AuthService, useClass: MockAuthService },
        { provide: FileUploadService }
      ]
    });

    productService = TestBed.get(ProductService);
    angularFireDatabase = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('should handle rating actions and', () => {
    beforeEach(() => {
      productService.authService.getUserUid = () => '123456789';
    });

    it('should handle a first rating', () => {
      const product = new Product();

      const result = productService.constructRating(product, 5);
      expect(result).toEqual({
        '/ratings/123456789/': 5,
        '/currentRating/': 5
      });
    });

    it('should handle a new rating from same user', () => {
      const product = new Product();
      product.currentRating = 5;
      product.ratings['123456789'] = 5;

      const result = productService.constructRating(product, 1);

      expect(result).toEqual({
        '/ratings/123456789/': 1,
        '/currentRating/': 1
      });
    });

    it('should handle a rating from a second user', () => {
      productService.authService.getUserUid = () => '987654321';

      const product = new Product();
      product.currentRating = 5;
      product.ratings = {'123456789': 5};

      const result = productService.constructRating(product, 1);

      expect(result).toEqual({
        '/currentRating/': 3,
        '/ratings/987654321/': 1
      });
    });
  });
});
