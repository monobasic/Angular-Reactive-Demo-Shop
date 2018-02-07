import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsListItemComponent,
    ProductDetailComponent
  ],
  exports: [
    ProductsListComponent,
    ProductDetailComponent
  ],
  providers: []
})
export class ProductsModule { }
