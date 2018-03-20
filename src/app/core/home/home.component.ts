import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../messages/message.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';
import { ProductService } from '../../products/shared/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[];
  productsFeatured: any;
  productsNewArrivals: Product[];

  constructor(
    private messageService: MessageService,
    private productsCache: ProductsCacheService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
    });
    this.productService.getFeaturedProducts()
      .subscribe(
        products => {
          console.log(products);
          this.productsFeatured = products;
        },
        err => console.error(err)
      );
  }



    // TODO: fix cache
    // this.productsCache.get('products', this.productService.getProducts())
    //   .subscribe(result => {
    //     this.products = result.products;
    //   });
    // }

}
