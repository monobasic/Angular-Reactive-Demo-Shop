import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const productsRoutes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: ProductDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductsRoutingModule {
}
