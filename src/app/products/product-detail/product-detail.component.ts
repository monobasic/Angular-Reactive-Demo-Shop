import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Location } from '@angular/common';
import { Params } from '@angular/router/src/shared';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../shared/product.service';
// import { OLDProductsCacheService } from '../shared/products-cache.service';
import { CartService } from '../../cart/shared/cart.service';
import { AuthService } from '../../account/shared/auth.service';

import { Rating } from '../../models/rating.model';
import { CartItem } from '../../models/cart-item.model';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';
import { ProductsCacheService } from '../shared/products-cache.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  productLoading: boolean;

  user: User;

  imagesLoaded: string[];
  activeImageUrl: string;
  activeImageIndex: number;

  selectedQuantity: number;

  ratingCount: number;
  ratingValues: number[];
  selectedRating: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private cartService: CartService,
    private productsCacheService: ProductsCacheService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.ratingValues = [1, 2, 3, 4, 5];
    this.selectedQuantity = 1;
    this.imagesLoaded = [];

    this.route.params.subscribe((params: Params) => {
      this.getProduct();
    });

    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  getProduct(): void {
    this.productLoading = true;

    const id = +this.route.snapshot.paramMap.get('id');

    this.productsCacheService
      // .get(id, this.productService.getProduct(id))
      .get(id, this.productService.getProducts())
      .subscribe((product: Product) => {
        console.log('product', product);
        if (product) {
          const categories = Object.keys(product.categories).map(
            (category, index, inputArray) => {
              category =
                index < inputArray.length - 1 ? category + ',' : category;
              return category;
            }
          );
          product.categories =
            categories.length >= 1 && !Array.isArray(product.categories)
              ? categories
              : [];

          this.product = product;
          this.activeImageUrl = this.product.imageURLs[0];
          this.activeImageIndex = 0;
          this.ratingCount = product.ratings
            ? Object.keys(product.ratings).length
            : 0;

          // check for existing rating
          if (
            product.ratings &&
            Object.keys(product.ratings).includes(this.authService.getUserUid())
          ) {
            this.selectedRating =
              product.ratings[this.authService.getUserUid()];
          }
          this.productLoading = false;
        } else {
          this.router.navigate(['/404-product-not-found']);
        }
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

  onRate() {
    const rating = parseInt(this.selectedRating, 10);
    this.productService
      .rateProduct(this.product, rating)
      .subscribe((response) => {
        this.getProduct();
      });
  }

  onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }
}
