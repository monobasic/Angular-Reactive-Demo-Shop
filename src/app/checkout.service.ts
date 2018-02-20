import { Injectable, EventEmitter } from '@angular/core';
import { Order } from './model/order.model';
import { Customer } from './model/customer.model';

@Injectable()
export class CheckoutService {
  orderInProgress: Order;
  stepChanged: EventEmitter<number> = new EventEmitter<number>();
  activeStep: number;

  constructor() {
    this.orderInProgress = new Order();
    this.orderInProgress.customer = new Customer();
    this.activeStep = 0;
  }

  gotoStep(number) {
    this.activeStep = number;
    this.stepChanged.emit(this.activeStep);
  }

  nextStep() {
    this.activeStep++;
    this.stepChanged.emit(this.activeStep);
  }

  previousStep() {
    this.activeStep--;
    this.stepChanged.emit(this.activeStep);
  }
}
