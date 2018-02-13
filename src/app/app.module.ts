// Modules
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './model/in-memory-data.service';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './products/products.module';

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

// Services
import { ProductService } from './products/shared/product.service';
import { CartService } from './cart/cart.service';
import { MessagesComponent } from './messages/messages.component';
import { PriceComponent } from './price/price.component';
import { SortPipe } from './sort.pipe';


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
    SortPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ProductsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    ToastrModule.forRoot()
  ],
  providers: [
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
