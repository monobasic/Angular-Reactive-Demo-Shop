import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { MessagesComponent } from './messages/messages.component';
import { PriceComponent } from '../price/price.component';

import { MessageService } from './messages/message.service';
import { PagerService } from './pager/pager.service';

import { SortPipe } from './sort.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MessagesComponent,
    PriceComponent,
    SortPipe
  ],
  exports: [
    MessagesComponent,
    PriceComponent,
    SortPipe
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        MessageService,
        PagerService,
        SortPipe
      ]
    };
  }
}
