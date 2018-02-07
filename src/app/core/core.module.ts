import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { MessagesComponent } from './messages/messages.component';

import { MessageService } from './messages/message.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MessagesComponent
  ],
  exports: [
    MessagesComponent
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
