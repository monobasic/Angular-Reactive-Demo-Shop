import { NgModule, Optional, SkipSelf } from '@angular/core';
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
import { NgxSiemaModule } from 'ngx-siema';

import { ProductService } from '../products/shared/product.service';
import { ProductsCacheService } from '../products/shared/products-cache.service';
import { MessageService } from '../messages/message.service';
import { CartService } from '../cart/shared/cart.service';
import { PagerService } from '../pager/pager.service';
import { OrderService } from '../orders/shared/order.service';
import { CheckoutService } from '../checkout/shared/checkout.service';
import { AuthService } from '../account/shared/auth.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { OffcanvasService } from './shared/offcanvas.service';
import { ProductWidgetComponent } from './home/product-widget/product-widget.component';

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
        MainSliderComponent,
        ProductWidgetComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxSiemaModule.forRoot()
    ],
    exports: [
        CommonModule,
        SharedModule,
        NavigationOffCanvasComponent,
        TopBarComponent,
        HeaderComponent,
        ContentComponent
    ],
    providers: [
        ProductService,
        ProductsCacheService,
        MessageService,
        CartService,
        PagerService,
        OrderService,
        CheckoutService,
        AuthService,
        OffcanvasService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
