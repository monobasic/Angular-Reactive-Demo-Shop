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
      closeButton: false
    });
  }
  addError(message: string): void {
    this.toastr.error(message, 'Message:', {
      disableTimeOut: false,
      closeButton: false
    });
  }

  clear(): void {
    this.messages = [];
  }
}
