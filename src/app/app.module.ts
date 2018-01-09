import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavigationMainComponent } from './navigation-main/navigation-main.component';

import { MessageService } from './message.service';
import { ProductService } from './product.service';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavigationOffCanvasComponent } from './navigation-off-canvas/navigation-off-canvas.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    ProductDetailComponent,
    NavigationMainComponent,
    HeaderComponent,
    NavigationOffCanvasComponent,
    TopBarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [
    MessageService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
