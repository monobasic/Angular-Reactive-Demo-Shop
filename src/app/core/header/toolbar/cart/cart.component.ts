import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../cart/shared/cart.service';
import { CartItem } from '../../../../models/cart-item.model';

@Component({
  selector: 'app-toolbar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class ToolbarCartComponent implements OnInit {
  public items: CartItem[];
  public total: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      }
    );
  }

  onRemoveItem(event, item: CartItem) {
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

}
