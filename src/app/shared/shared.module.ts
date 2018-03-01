import { NgModule } from '@angular/core';
import { PriceComponent } from '../price/price.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PriceComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        PriceComponent
    ]
})
export class SharedModule {}
