import { NgModule } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';

@NgModule({
    declarations: [
        CheckoutComponent,
        AddressComponent,
        FooterComponent,
        PaymentComponent,
        ReviewComponent,
        ShippingComponent,
        SidebarComponent,
        CompleteComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SharedModule,
        CheckoutComponent,
        AddressComponent,
        FooterComponent,
        PaymentComponent,
        ReviewComponent,
        ShippingComponent,
        SidebarComponent,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CheckoutModule {}
