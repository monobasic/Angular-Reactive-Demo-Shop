import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { CartService } from '../../cart/shared/cart.service';

import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  @Input() public product: Product;
  @Input() public displayMode: string;
  public user: User;
  public imageLoading: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.imageLoading = true;
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  public onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, 1));
  }

  public onImageLoad() {
    this.imageLoading = false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
