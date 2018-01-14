import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      { id: 11,
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
    return { products };
  }
}
