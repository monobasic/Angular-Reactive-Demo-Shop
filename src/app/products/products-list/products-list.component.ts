import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Product } from '../shared/product.model';

import { ProductService } from '../shared/product.service';
import { PagerService } from '../../core/pager/pager.service';
import { SortPipe } from '../../core/sort.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  productsPaged: Product[];
  displayMode: string;
  pager: any = {};
  sortBy: string;

  constructor(private productService: ProductService, private pagerService: PagerService, private sortPipe: SortPipe) { }

  ngOnInit() {
    this.displayMode = 'grid';
    this.sortBy = 'name';
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.setPage(1);
      });
  }

  onDisplayModeChange(mode: string, e: Event) {
    this.displayMode = mode;
    e.preventDefault();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.products.length, page, 8);
    this.productsPaged = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onSort(sortBy: string) {
    // check for reverse
    const reverse = sortBy.endsWith(':reverse');
    this.sortPipe.transform(this.products, sortBy.replace(':reverse', ''), reverse);
    this.setPage(this.pager.currentPage);
  }
}
