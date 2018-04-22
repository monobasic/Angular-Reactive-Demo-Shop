import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../../account/shared/auth.service';
import { MessageService } from '../../messages/message.service';
import { ProductRatingService } from './product-rating.service';

import { Product } from '../../models/product.model';
import { User, Roles } from '../../models/user.model';

class MockAuthService {
  user: Observable<User>;

  constructor() {
    this.user = of({
      email: 'foo@bar.com',
      firstName: 'foo',
      lastName: 'bar',
      uid: '123456789'
    });
  }

}

describe('Rating', () => {
  let productRatingService: ProductRatingService;
  let angularFireDatabase: AngularFireDatabase;
  let authService: MockAuthService;

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
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(productRatingService).toBeTruthy();
  });

  describe('should handle rating actions and', () => {

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
      const product = new Product();
      product.currentRating = 5;
      product.ratings = {'987654321': 5};

      const result = productRatingService['constructRating'](product, 1);

      expect(result).toEqual({
        '/currentRating/': 3,
        '/ratings/123456789/': 1
      });
    });
  });
});
