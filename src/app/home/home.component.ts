import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages/message.service';
import { ProductService } from '../products/shared/product.service';
import { ProductsCacheService } from '../products/shared/products-cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(
    private messageService: MessageService,
    private productService: ProductService,
    private productsCacheService: ProductsCacheService
  ) {}

  ngOnInit() {
    this.messageService.add('MessageService: App ready!');
    this.getProducts();
  }
  getProducts() {
    this.productsCacheService
      .get('product', this.productService.getProducts())
      .subscribe((products) => {
        this.products = products.products || products;
      });
  }
}
