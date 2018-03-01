import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { NavigationOffCanvasComponent } from './navigation-off-canvas/navigation-off-canvas.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './content/footer/footer.component';
import { NavigationMainComponent } from './header/navigation-main/navigation-main.component';
import { ToolbarCartComponent } from './header/toolbar/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MainSliderComponent } from './home/main-slider/main-slider.component';

import { ProductService } from '../products/shared/product.service';
import { ProductsCacheService } from '../products/shared/products-cache.service';
import { MessageService } from '../messages/message.service';
import { CartService } from '../cart/cart.service';
import { PagerService } from '../pager/pager.service';
import { AdminGuard } from '../admin.guard';
import { OrderService } from '../order.service';
import { CheckoutService } from '../checkout.service';
import { AdminAuthService } from '../admin-auth.service';
import { AuthenticationService } from '../authentication.service';

@NgModule({
    declarations: [
        ContentComponent,
        HeaderComponent,
        NavigationOffCanvasComponent,
        TopBarComponent,
        FooterComponent,
        NavigationMainComponent,
        ToolbarCartComponent,
        HomeComponent,
        MainSliderComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        AppRoutingModule,
        CommonModule,
        SharedModule,
        HeaderComponent,
        NavigationOffCanvasComponent,
        TopBarComponent,
        ContentComponent,
        FooterComponent,
        NavigationMainComponent,
        ToolbarCartComponent,
        HomeComponent,
        MainSliderComponent
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
    ]
})
export class CoreModule {}
