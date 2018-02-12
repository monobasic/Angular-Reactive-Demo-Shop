// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './model/in-memory-data.service';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
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

// Services
import { ProductService } from './products/shared/product.service';
import { ProductsCacheService } from './products/shared/products-cache.service';

import { CartService } from './cart/cart.service';
import { ToolbarCartComponent } from './toolbar/cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


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
    PageNotFoundComponent
  ],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ProductsModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    ToastrModule.forRoot(),
    // BsDropdownModule.forRoot()
  ],
  providers: [
    ProductService,
    ProductsCacheService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
