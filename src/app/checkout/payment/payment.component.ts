import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  formPayment: FormGroup;
  paypalLoggedIn: boolean;
  paymentMethods: string[];

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.paypalLoggedIn = false;
    this.paymentMethods = ['Paypal', 'Prepayment'];
    this.formPayment = new FormGroup({
      'paymentMethod': new FormControl(this.paymentMethods[0], Validators.required)
    });
  }

  onPaypalLogin(event: Event) {
    this.paypalLoggedIn = true;
  }

  onBack() {
    this.checkoutService.previousStep();
  }

  onContinue() {
    this.checkoutService.setPaymentMethod(this.formPayment.controls.paymentMethod.value);
    this.checkoutService.nextStep();
  }

}
