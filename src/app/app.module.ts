// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { NavigationMainComponent } from './navigation-main/navigation-main.component';
import { NavigationOffCanvasComponent } from './navigation-off-canvas/navigation-off-canvas.component';
import { HeaderComponent } from './header/header.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ContentComponent } from './content/content.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarCartComponent } from './toolbar/cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsListItemComponent } from './products/products-list-item/products-list-item.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { PriceComponent } from './price/price.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent as CheckoutAddressComponent } from './checkout/address/address.component';
import { ShippingComponent as CheckoutShippingComponent } from './checkout/shipping/shipping.component';
import { PaymentComponent as CheckoutPaymentComponent } from './checkout/payment/payment.component';
import { ReviewComponent as CheckoutReviewComponent } from './checkout/review/review.component';
import { FooterComponent as CheckoutFooterComponent } from './checkout/footer/footer.component';
import { SidebarComponent as CheckoutSidebarComponent } from './checkout/sidebar/sidebar.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { ProfileComponent } from './profile/profile.component';
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

// Pipes
import { SortPipe } from './sort.pipe';

// Guards
import { AdminGuard } from './admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    NavigationMainComponent,
    HeaderComponent,
    NavigationOffCanvasComponent,
    TopBarComponent,
    ContentComponent,
    MainSliderComponent,
    FooterComponent,
    ToolbarCartComponent,
    PageNotFoundComponent,
    MessagesComponent,
    PriceComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    ProductDetailComponent,
    SortPipe,
    AddEditComponent,
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutShippingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutFooterComponent,
    CheckoutSidebarComponent,
    RegisterLoginComponent,
    ProfileComponent,
    OrdersComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    ToastrModule.forRoot()
  ],
  providers: [
    ProductService,
    ProductsCacheService,
    MessageService,
    CartService,
    PagerService,
    SortPipe,
    AdminGuard,
    OrderService,
    CheckoutService,
    SortPipe,
    AdminAuthService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
