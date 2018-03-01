import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { NavigationOffCanvasComponent } from './navigation-off-canvas/navigation-off-canvas.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './content/footer/footer.component';
import { NavigationMainComponent } from './header/navigation-main/navigation-main.component';
import { ToolbarCartComponent } from './header/toolbar/cart/cart.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ContentComponent,
        HeaderComponent,
        NavigationOffCanvasComponent,
        TopBarComponent,
        FooterComponent,
        NavigationMainComponent,
        ToolbarCartComponent
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
        ToolbarCartComponent
    ]
})
export class CoreModule {}
