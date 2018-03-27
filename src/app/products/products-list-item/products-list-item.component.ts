import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../cart/shared/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { AuthService } from '../../account/shared/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
  @Input() product: Product;
  @Input() displayMode: string;
  user: User;
  imageLoading: boolean;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.imageLoading = true;
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, 1));
  }

  onImageLoad() {
    this.imageLoading = false;
  }

}
