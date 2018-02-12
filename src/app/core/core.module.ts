import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { MessagesComponent } from './messages/messages.component';
import { PriceComponent } from '../price/price.component';

import { MessageService } from './messages/message.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MessagesComponent,
    PriceComponent
  ],
  exports: [
    MessagesComponent,
    PriceComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        MessageService
      ]
    };
  }
}
