import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product.model';
import { Rating } from './rating.model';
import { Review } from './review.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      {
        id: 11,
        name: 'Shoes',
        date: '2017-12-23',
        price: 69.3,
        priceNormal: 99,
        reduction: 70,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/01.jpg', 'img/shop/products/02.jpg'],
        categories: ['Shoes'],
        ratings: [
          { userId: 1, rating: 1},
          { userId: 2, rating: 2},
          { userId: 3, rating: 1}
        ]
      },
      {
        id: 12,
        name: 'Bag',
        date: '2016-12-23',
        price: 49,
        priceNormal: 49,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/02.jpg', 'img/shop/products/02.jpg', 'img/shop/products/02.jpg'],
        categories: ['Bags'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 13,
        name: 'Shades',
        date: '2017-12-12',
        price: 35.1,
        priceNormal: 39,
        reduction: 10,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg'],
        categories: ['Shades'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 14,
        name: 'Bracelet',
        date: '2017-10-11',
        price: 19,
        priceNormal: 19,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/04.jpg', 'img/shop/products/04.jpg'],
        categories: ['Jewelry'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 15,
        name: 'Sweater',
        date: '2017-08-03',
        price: 69,
        priceNormal: 69,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/05.jpg', 'img/shop/products/05.jpg', 'img/shop/products/05.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 16,
        name: 'Trainer',
        date: '2017-01-13',
        price: 65,
        priceNormal: 65,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/06.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 17,
        name: 'Sweatpants',
        date: '2017-02-02',
        price: 45,
        priceNormal: 45,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/07.jpg', 'img/shop/products/07.jpg', 'img/shop/products/07.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 18,
        name: 'Bluse',
        date: '2016-01-23',
        price: 68,
        priceNormal: 68,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/08.jpg', 'img/shop/products/08.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 19,
        name: 'Ballerinas',
        date: '2016-04-30',
        price: 89,
        priceNormal: 89,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 25,
        name: 'Sweater',
        date: '2018-05-12',
        price: 69,
        priceNormal: 69,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/05.jpg', 'img/shop/products/05.jpg', 'img/shop/products/05.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 26,
        name: 'Trainer',
        date: '2018-02-22',
        price: 65,
        priceNormal: 65,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/06.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 27,
        name: 'Sweatpants',
        date: '2018-12-01',
        price: 45,
        priceNormal: 45,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/07.jpg', 'img/shop/products/07.jpg', 'img/shop/products/07.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 28,
        name: 'Bluse',
        date: '2015-01-15',
        price: 68,
        priceNormal: 68,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/08.jpg', 'img/shop/products/08.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 29,
        name: 'Ballerinas',
        date: '2016-06-02',
        price: 89,
        priceNormal: 89,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg'],
        categories: ['Clothes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 30,
        name: 'Baseball Hat',
        date: '2017-03-12',
        price: 20,
        priceNormal: 25,
        reduction: 20,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/10.jpg', 'img/shop/products/10.jpg'],
        categories: ['Caps'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 31,
        name: 'Shoes',
        date: '2017-02-29',
        price: 69.3,
        priceNormal: 99,
        reduction: 70,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/01.jpg', 'img/shop/products/02.jpg'],
        categories: ['Shoes'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 32,
        name: 'Bag',
        date: '2017-08-09',
        price: 49,
        priceNormal: 49,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/02.jpg', 'img/shop/products/02.jpg', 'img/shop/products/02.jpg'],
        categories: ['Bags'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 33,
        name: 'Shades',
        date: '2018-02-11',
        price: 35.1,
        priceNormal: 39,
        reduction: 10,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg'],
        categories: ['Shades'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
      },
      {
        id: 34,
        name: 'Bracelet',
        date: '2018-11-09',
        price: 19,
        priceNormal: 19,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/04.jpg', 'img/shop/products/04.jpg'],
        categories: ['Jewelry'],
        ratings: [
          { userId: 1, rating: 1 },
          { userId: 2, rating: 2 },
          { userId: 3, rating: 1 }
        ]
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
        customerID: '101',
        text: 'super product, love it',
        productID: 11,
        ratingID: 1
      }
    ];

    return { products, ratings, reviews };
  }
}
