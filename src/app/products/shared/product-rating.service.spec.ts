import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../../account/shared/auth.service';
import { MessageService } from '../../messages/message.service';
import { ProductRatingService } from './product-rating.service';

import { Product } from '../../models/product.model';

class MockAuthService {}

describe('Rating', () => {
  let productRatingService: ProductRatingService;
  let angularFireDatabase: AngularFireDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductRatingService,
        { provide: MessageService },
        { provide: AngularFireDatabase },
        { provide: AuthService, useClass: MockAuthService }
      ]
    });

    productRatingService = TestBed.get(ProductRatingService);
    angularFireDatabase = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(productRatingService).toBeTruthy();
  });

  describe('should handle rating actions and', () => {
    beforeEach(() => {
      productRatingService.authService.getUserUid = () => '123456789';
    });

    it('should handle a first rating', () => {
      const product = new Product();

      const result = productRatingService['constructRating'](product, 5);
      expect(result).toEqual({
        '/ratings/123456789/': 5,
        '/currentRating/': 5
      });
    });

    it('should handle a new rating from same user', () => {
      const product = new Product();
      product.currentRating = 5;
      product.ratings['123456789'] = 5;

      const result = productRatingService['constructRating'](product, 1);

      expect(result).toEqual({
        '/ratings/123456789/': 1,
        '/currentRating/': 1
      });
    });

    it('should handle a rating from a second user', () => {
      productRatingService.authService.getUserUid = () => '987654321';

      const product = new Product();
      product.currentRating = 5;
      product.ratings = {'123456789': 5};

      const result = productRatingService['constructRating'](product, 1);

      expect(result).toEqual({
        '/currentRating/': 3,
        '/ratings/987654321/': 1
      });
    });
  });
});
