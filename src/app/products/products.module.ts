import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';

import { SortPipe } from '../sort.pipe';

@NgModule({
    declarations: [
        ProductDetailComponent,
        ProductsListComponent,
        ProductsListItemComponent,
        SortPipe
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule
    ],
    providers: [
        SortPipe
    ]
})
export class ProductsModule {}
