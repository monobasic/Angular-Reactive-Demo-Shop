import { Injectable } from '@angular/core';

import { Observable ,  of } from 'rxjs';
import { publishReplay ,  refCount ,  switchMap } from 'rxjs/operators';

import { Product } from '../../models/product.model';

@Injectable()
export class ProductsCacheService {
  private products: Observable<Product[]>;

  public get(key: string | number, fallback: Observable<Product[]>) {
    if (typeof key === 'string') {
      return this.getProducts(fallback);
    } else {
      return this.getProduct(key, fallback);
    }
  }

  private getProducts(fallback: Observable<Product[]>) {
    if (!this.products) {
      this.products = fallback.pipe(publishReplay(1), refCount());
    }
    return this.products;
  }

  private getProduct(key: any, fallback: Observable<Product[]>) {
    return this.getProducts(fallback).pipe(
      switchMap((products) => {
        const selectedProduct = products.find((product) => {
          return product.id === key;
        });
        return of(selectedProduct);
      }),
      publishReplay(1),
      refCount()
    );
  }

  public clearCache() {
    this.products = null;
  }
}
