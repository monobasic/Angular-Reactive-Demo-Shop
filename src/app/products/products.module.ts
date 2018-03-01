import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';

import { SortPipe } from '../sort.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        ProductDetailComponent,
        ProductsListComponent,
        ProductsListItemComponent,
        SortPipe
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        ProductDetailComponent,
        ProductsListComponent,
        ProductsListItemComponent,
        SortPipe,
        AppRoutingModule
    ],
    providers: [
        SortPipe
    ]
})
export class ProductsModule {}
