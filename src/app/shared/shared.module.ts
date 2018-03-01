import { NgModule } from '@angular/core';
import { PriceComponent } from '../price/price.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PriceComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        PriceComponent,
        RouterModule
    ]
})
export class SharedModule {}
