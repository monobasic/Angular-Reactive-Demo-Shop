import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor(private toastr: ToastrService) {}

  add(message: string): void {
    this.messages.push(message);
    this.toastr.success(message, 'Message:', {
      disableTimeOut: false,
      closeButton: false,
      positionClass: 'toast-bottom-right'
    });
  }
  addError(message: string): void {
    this.toastr.error(message, 'Message:', {
      disableTimeOut: false,
      closeButton: false,
      positionClass: 'toast-bottom-right'
    });
  }

  clear(): void {
    this.messages = [];
  }
}
