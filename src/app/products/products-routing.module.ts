import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const productRoutes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: ProductDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(productRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
