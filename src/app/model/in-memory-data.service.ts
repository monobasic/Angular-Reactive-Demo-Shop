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
