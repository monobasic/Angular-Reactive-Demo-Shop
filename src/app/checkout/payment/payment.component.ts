import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public formPayment: FormGroup;
  public paypalLoggedIn: boolean;
  public paymentMethods: string[];

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.paypalLoggedIn = false;
    this.paymentMethods = ['Paypal', 'Prepayment'];
    this.formPayment = new FormGroup({
      'paymentMethod': new FormControl(this.paymentMethods[0], Validators.required)
    });
  }

  public onPaypalLogin(event: Event) {
    this.paypalLoggedIn = true;
  }

  public onBack() {
    this.checkoutService.previousStep();
  }

  public onContinue() {
    this.checkoutService.setPaymentMethod(this.formPayment.controls.paymentMethod.value);
    this.checkoutService.nextStep();
  }

}
