import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {
  messages: string[] = [];
  toastrConfig: {} = {
    disableTimeOut: false,
    closeButton: false,
    positionClass: 'toast-bottom-right'
  };

  constructor(private toastr: ToastrService) {}

  add(message: string): void {
    this.messages.push(message);
    this.toastr.success(message, 'Message:', this.toastrConfig);
  }
  addError(message: string): void {
    this.toastr.error(message, 'Message:', this.toastrConfig);
  }

  clear(): void {
    this.messages = [];
  }
}
