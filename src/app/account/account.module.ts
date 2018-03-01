import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ProfileComponent,
        RegisterLoginComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class AccountModule {}
