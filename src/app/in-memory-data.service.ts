import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';
import { Rating } from './rating';
import { Review } from './review';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      {
        id: 11,
        name: 'Gloves',
        description: 'Hello world',
        imageURLs: ['/img1.jpg'],
        ratingIDs: [1, 2, 3],
        reviewIDs: [3, 4, 5],
        sizes: [9, 10, 11] ,
        colors: ['mauve', 'taube', 'mint'],
        categoryIDs: [1, 2, 3]
      }
    ];

    const ratings: Rating[] = [
      {
        id: 1,
        customerID: '101',
        productID: 11,
        rating: 5
      }
    ];

    const reviews: Review[] = [
      {
        id: 1,
        customerId: '101',
        text: 'super product, love it',
        ratingID: 1
      }
    ];

    return { products, ratings, reviews };
  }
}
