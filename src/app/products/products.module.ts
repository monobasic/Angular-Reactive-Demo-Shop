import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';

import { SortPipe } from './shared/sort.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        ProductDetailComponent,
        ProductsListComponent,
        ProductsListItemComponent,
        SortPipe
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ProductDetailComponent,
        ProductsListComponent,
        ProductsListItemComponent,
        SortPipe
    ],
    providers: [
        SortPipe
    ]
})
export class ProductsModule {}
