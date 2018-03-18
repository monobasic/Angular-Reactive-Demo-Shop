import { Product } from '../../models/product.model';

export const placeholderProduct: Product = {
  id: null,
  date: new Date().toString(),
  name: '',
  description: '',
  price: 1000,
  priceNormal: 2000,
  imageURLs: [],
  categories: ['Some', 'Example', 'Categories'],
  reduction: 50
};
