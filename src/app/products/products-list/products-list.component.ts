import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Product } from '../shared/product.model';

import { ProductService } from '../shared/product.service';
import { ProductsCacheService } from '../shared/products-cache.service';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private productsCacheService: ProductsCacheService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsCacheService
      .get('product', this.productService.getProducts())
      .subscribe((products) => {
        this.products = products;
      });
  }
}
