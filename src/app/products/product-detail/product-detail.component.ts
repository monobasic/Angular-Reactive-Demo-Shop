import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../shared/product.service';
import { ProductsCacheService } from '../shared/products-cache.service';

import { Product } from '../shared/product.model';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/shared/cart-item.model';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  activeImageUrl: string;
  activeImageIndex: number;
  selectedQuantity: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productsCacheService: ProductsCacheService,
    private location: Location,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.selectedQuantity = 1;

    this.route.params.subscribe((params: Params) => {
      this.getProduct();
    });
  }
  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productsCacheService
      .get(id, this.productService.getProduct(id))
      .subscribe((product) => {
        this.product = product;
        this.activeImageUrl = this.product.imageURLs[0];
        this.activeImageIndex = 0;
      });
  }
  onSelectThumbnail(event, index) {
    event.preventDefault();
    this.activeImageUrl = this.product.imageURLs[index];
    this.activeImageIndex = index;
  }

  onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, this.selectedQuantity));
  }

  onSelectQuantity(event) {
    this.selectedQuantity = <number>+event.target.value;
  }
}
