import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../model/product.model';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/shared/cart-item.model';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
  @Input() product: Product;
  @Input() displayMode: string;

  constructor(private cartService: CartService) {}

  ngOnInit() {
  }

  onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, 1));
  }

}
