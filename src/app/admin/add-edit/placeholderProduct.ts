import { Product } from '../../models/product.model';

export const placeholderProduct: Product = {
  id: null,
  date: new Date().toISOString().split('T')[0],
  name: '',
  description: '',
  price: 1000,
  priceNormal: 2000,
  imageURLs: [],
  imageRefs: [],
  categories: ['Some', 'Example', 'Categories'],
  reduction: 50,
  sale: true
};
