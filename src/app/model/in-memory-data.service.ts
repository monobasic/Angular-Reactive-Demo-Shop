import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../products/shared/product.model';
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
        categories: ['Shoes']
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
        categories: ['Bags']
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
        categories: ['Shades']
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
        categories: ['Jewelry']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
      },
      {
        id: 20,
        name: 'Baseball Hat',
        date: '2017-06-01',
        price: 20,
        priceNormal: 25,
        reduction: 20,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/10.jpg', 'img/shop/products/10.jpg'],
        categories: ['Caps']
      },
      {
        id: 21,
        name: 'Shoes',
        date: '2017-08-03',
        price: 69.3,
        priceNormal: 99,
        reduction: 70,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/01.jpg', 'img/shop/products/02.jpg'],
        categories: ['Shoes']
      },
      {
        id: 22,
        name: 'Bag',
        date: '2017-09-24',
        price: 49,
        priceNormal: 49,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/02.jpg', 'img/shop/products/02.jpg', 'img/shop/products/02.jpg'],
        categories: ['Bags']
      },
      {
        id: 23,
        name: 'Shades',
        date: '2017-11-22',
        price: 35.1,
        priceNormal: 39,
        reduction: 10,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg'],
        categories: ['Shades']
      },
      {
        id: 24,
        name: 'Bracelet',
        date: '2018-01-23',
        price: 19,
        priceNormal: 19,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/04.jpg', 'img/shop/products/04.jpg'],
        categories: ['Jewelry']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Clothes']
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
        categories: ['Caps']
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
        categories: ['Shoes']
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
        categories: ['Bags']
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
        categories: ['Shades']
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
        categories: ['Jewelry']
      },
      {
        id: 35,
        name: 'Sweater',
        date: '2018-03-04',
        price: 69,
        priceNormal: 69,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/05.jpg', 'img/shop/products/05.jpg', 'img/shop/products/05.jpg'],
        categories: ['Clothes']
      },
      {
        id: 36,
        name: 'Trainer',
        date: '2016-12-11',
        price: 65,
        priceNormal: 65,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/06.jpg'],
        categories: ['Clothes']
      },
      {
        id: 37,
        name: 'Sweatpants',
        date: '2015-12-29',
        price: 45,
        priceNormal: 45,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/07.jpg', 'img/shop/products/07.jpg', 'img/shop/products/07.jpg'],
        categories: ['Clothes']
      },
      {
        id: 38,
        name: 'Bluse',
        date: '2018-07-11',
        price: 68,
        priceNormal: 68,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/08.jpg', 'img/shop/products/08.jpg'],
        categories: ['Clothes']
      },
      {
        id: 39,
        name: 'Ballerinas',
        date: '2017-10-10',
        price: 89,
        priceNormal: 89,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg'],
        categories: ['Clothes']
      },
      {
        id: 40,
        name: 'Baseball Hat',
        date: '2017-10-10',
        price: 20,
        priceNormal: 25,
        reduction: 20,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/10.jpg', 'img/shop/products/10.jpg'],
        categories: ['Caps']
      },
      {
        id: 41,
        name: 'Shoes',
        date: '2017-10-09',
        price: 69.3,
        priceNormal: 99,
        reduction: 70,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/01.jpg', 'img/shop/products/02.jpg'],
        categories: ['Shoes']
      },
      {
        id: 42,
        name: 'Bag',
        date: '2017-11-12',
        price: 49,
        priceNormal: 49,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/02.jpg', 'img/shop/products/02.jpg', 'img/shop/products/02.jpg'],
        categories: ['Bags']
      },
      {
        id: 43,
        name: 'Shades',
        date: '2017-09-05',
        price: 35.1,
        priceNormal: 39,
        reduction: 10,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg', 'img/shop/products/03.jpg'],
        categories: ['Shades']
      },
      {
        id: 44,
        name: 'Bracelet',
        date: '2017-05-04',
        price: 19,
        priceNormal: 19,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/04.jpg', 'img/shop/products/04.jpg'],
        categories: ['Jewelry']
      },
      {
        id: 45,
        name: 'Sweater',
        date: '2017-01-02',
        price: 69,
        priceNormal: 69,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/05.jpg', 'img/shop/products/05.jpg', 'img/shop/products/05.jpg'],
        categories: ['Clothes']
      },
      {
        id: 46,
        name: 'Trainer',
        date: '2017-02-03',
        price: 65,
        priceNormal: 65,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/06.jpg'],
        categories: ['Clothes']
      },
      {
        id: 47,
        name: 'Sweatpants',
        date: '2017-02-03',
        price: 45,
        priceNormal: 45,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/07.jpg', 'img/shop/products/07.jpg', 'img/shop/products/07.jpg'],
        categories: ['Clothes']
      },
      {
        id: 48,
        name: 'Bluse',
        date: '2017-03-04',
        price: 68,
        priceNormal: 68,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/08.jpg', 'img/shop/products/08.jpg'],
        categories: ['Clothes']
      },
      {
        id: 49,
        name: 'Ballerinas',
        date: '2017-03-05',
        price: 89,
        priceNormal: 89,
        reduction: 0,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg', 'img/shop/products/09.jpg'],
        categories: ['Clothes']
      },
      {
        id: 50,
        name: 'Baseball Hat',
        date: '2017-04-04',
        price: 20,
        priceNormal: 25,
        reduction: 20,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        imageURLs: ['img/shop/products/10.jpg', 'img/shop/products/10.jpg'],
        categories: ['Caps']
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
