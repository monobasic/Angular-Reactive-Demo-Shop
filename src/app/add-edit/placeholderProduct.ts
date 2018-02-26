import { Product } from '../models/product.model';

export const placeholderProduct: Product = {
  id: 1,
  date: new Date().toString(),
  name: 'Placeholder Product Name',
  description: 'Come up with something descriptive',
  price: 1000,
  priceNormal: 2000,
  imageURLs: ['img/shop/products/13.jpg'],
  categories: ['Some', 'Example', 'Categories'],
  reduction: 50
};
