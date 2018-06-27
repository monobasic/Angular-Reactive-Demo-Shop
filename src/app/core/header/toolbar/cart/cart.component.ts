import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from '../../../../cart/shared/cart.service';

import { CartItem } from '../../../../models/cart-item.model';

@Component({
  selector: 'app-toolbar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class ToolbarCartComponent implements OnInit, OnDestroy {
  public items: CartItem[];
  public total: number;
  private cartSubscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartSubscription = this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      }
    );
  }

  public onRemoveItem(event, item: CartItem) {
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
