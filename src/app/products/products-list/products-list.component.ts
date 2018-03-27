import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Product } from '../../models/product.model';

import { ProductService } from '../shared/product.service';
import { PagerService } from '../../pager/pager.service';
import { SortPipe } from '../shared/sort.pipe';
import { ProductsCacheService } from '../shared/products-cache.service';
import { AuthService } from '../../account/shared/auth.service';
import { User } from '../../models/user.model';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  productsPaged: Product[];
  pager: any = {};
  user: User;

  constructor(
    private productService: ProductService,
    private productsCacheService: ProductsCacheService,
    private pagerService: PagerService,
    private sortPipe: SortPipe,
    private authService: AuthService,
    public uiService: UiService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.getProducts();
  }

  getProducts() {
    // Show spinner
    this.productsCacheService
      .get('products', this.productService.getProducts())
      .subscribe((products) => {
        this.products = products;
        this.setPage(1);
        // Hide Spinner
      });
  }

  onDisplayModeChange(mode: string, e: Event) {
    this.uiService.displayMode$.next(mode);
    e.preventDefault();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.products.length, page, 8);
    this.productsPaged = this.products.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  onSort(sortBy: string) {
    this.sortPipe.transform(
      this.products,
      sortBy.replace(':reverse', ''),
      sortBy.endsWith(':reverse')
    );
    this.uiService.sorting$.next(sortBy);
    this.setPage(this.pager.currentPage);
  }
}
