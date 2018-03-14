import { Component, OnInit } from '@angular/core';
import { ProductsCacheService } from './products/shared/products-cache.service';
import { ProductService } from './products/shared/product.service';
import { MessageService } from './messages/message.service';
import { OffcanvasService } from './core/shared/offcanvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: any;

  constructor(
    private productService: ProductService,
    private productsCacheService: ProductsCacheService,
    private messageService: MessageService,
    public offcanvasService: OffcanvasService
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
