import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PricePipe } from '../price.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsListItemComponent,
    ProductDetailComponent,
    PricePipe
  ],
  exports: [
    ProductsListComponent,
    ProductDetailComponent
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe
  ]
})
export class ProductsModule { }
