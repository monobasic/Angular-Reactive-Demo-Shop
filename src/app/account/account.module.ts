import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AccountComponent,
        ProfileComponent,
        OrdersComponent,
        RegisterLoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SharedModule
    ]
})
export class AccountModule {}
