import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paypalLoggedIn: boolean;
  paymentMethod: string;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.paypalLoggedIn = false;
    this.paymentMethod = 'Paypal';
  }

  onPaypalLogin(event: Event) {
    this.paypalLoggedIn = true;
  }

  onBack() {
    this.checkoutService.previousStep();
  }

  onContinue() {
    this.checkoutService.setPaymentMethod(this.paymentMethod);
    this.checkoutService.nextStep();
  }

}
