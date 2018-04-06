import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';
import { PromoService } from '../shared/promo.service';
import { MessageService } from '../../messages/message.service';

import { Product } from '../../models/product.model';
import { Promo } from '../../models/promo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[];
  productsFeatured: any;
  productsNewArrivals: Product[];
  productsOnSale: Product[];
  productsBestRated: Product[];
  promos: Promo[];

  constructor(
    private messageService: MessageService,
    private productsCache: ProductsCacheService,
    private productService: ProductService,
    private promoService: PromoService
  ) {}

  ngOnInit() {
    this.productsCache
      .get('products', this.productService.getProducts())
      .subscribe((products) => {
        this.products = products;
      });

    this.productService.getFeaturedProducts().subscribe(
      (products) => {
        this.productsFeatured = products;
      },
      (err) => console.error(err)
    );

    this.productService.getProductsByDate(3).subscribe(
      (products) => {
        this.productsNewArrivals = products;
      },
      (err) => console.error(err)
    );

    this.productService.getProductsByRating(3).subscribe(
      (products) => {
        this.productsBestRated = products;
      },
      (err) => console.error(err)
    );

    this.productService.getProductsQuery('sale', true, 3).subscribe(
      (products) => {
        this.productsOnSale = products;
      },
      (err) => console.error(err)
    );

    this.promoService.getPromos().subscribe((promos) => {
      this.promos = promos;
    });
  }
}
