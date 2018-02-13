import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor(private toastr: ToastrService) { }

  add(message: string): void {
    this.messages.push(message);
    // Show message
    // Toastr API doc: https://github.com/scttcper/ngx-toastr
    // setTimeout is needed: https://github.com/scttcper/ngx-toastr/issues/160
    setTimeout(() => this.toastr.success(message, 'Message:', {
      disableTimeOut: false,
      closeButton: false
    }));
  }

  clear(): void {
    this.messages = [];
  }

}
