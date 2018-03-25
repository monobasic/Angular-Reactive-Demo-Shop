import { Product } from '../../models/product.model';

export class PlaceholderProduct implements Product {
  constructor(
    public id: number,
    public date: string,
    public name: string,
    public description: string,
    public price: number,
    public priceNormal: number,
    public imageRefs: string[],
    public imageURLs: string[],
    public categories: string[],
    public reduction: number,
    public sale: boolean
  ) {}
}

  // id: null,
  // date: new Date().toISOString().split('T')[0],
  // name: '',
  // description: '',
  // price: 1000,
  // priceNormal: 2000,
  // imageURLs: [],
  // imageRefs: [],
  // categories: ['Some', 'Example', 'Categories'],
  // reduction: 50,
  // sale: true
