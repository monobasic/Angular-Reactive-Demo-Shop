// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { CheckoutModule } from './checkout/checkout.module';
import { AccountModule } from './account/account.module';

// Components
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountComponent } from './account/account.component';

// Services
// import { InMemoryDataService } from './models/in-memory-data.service';
import { ProductService } from './products/shared/product.service';
import { ProductsCacheService } from './products/shared/products-cache.service';
import { CartService } from './cart/cart.service';
import { MessageService } from './messages/message.service';
import { PagerService } from './pager/pager.service';
import { OrderService } from './order.service';
import { CheckoutService } from './checkout.service';
import { AuthenticationService } from './authentication.service';
import { AdminAuthService } from './admin-auth.service';

// Guards
import { AdminGuard } from './admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    PageNotFoundComponent,
    AddEditComponent,
    OrdersComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
    ProductsModule,
    CheckoutModule,
    AccountModule
  ],
  providers: [
    ProductService,
    ProductsCacheService,
    MessageService,
    CartService,
    PagerService,
    AdminGuard,
    OrderService,
    CheckoutService,
    AdminAuthService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
