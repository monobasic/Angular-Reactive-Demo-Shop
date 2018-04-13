import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { CartService } from '../../cart/shared/cart.service';

import { AuthService } from '../../account/shared/auth.service';

import { CartItem } from '../../models/cart-item.model';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  @Input() product: Product;
  @Input() displayMode: string;
  user: User;
  imageLoading: boolean;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.imageLoading = true;
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, 1));
  }

  onImageLoad() {
    this.imageLoading = false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
