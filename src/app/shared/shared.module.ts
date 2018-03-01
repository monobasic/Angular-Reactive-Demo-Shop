import { NgModule } from '@angular/core';
import { PriceComponent } from '../price/price.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        PriceComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        PriceComponent,
        CommonModule,
        AppRoutingModule
    ]
})
export class SharedModule {}
