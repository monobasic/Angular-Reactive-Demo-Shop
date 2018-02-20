import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paypalLoggedIn: boolean;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.paypalLoggedIn = false;
  }

  onPaypalLogin(event: Event) {
    this.paypalLoggedIn = true;
  }

  onBack() {
    this.checkoutService.previousStep();
  }

  onContinue() {
    this.checkoutService.nextStep();
  }

}
