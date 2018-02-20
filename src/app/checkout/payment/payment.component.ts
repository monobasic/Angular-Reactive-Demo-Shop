import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentMethodChoosen: boolean;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.paymentMethodChoosen = false;
  }

  onPaypalLogin(event: Event) {
    this.paymentMethodChoosen = true;
  }

  onContinue() {
    this.checkoutService.nextStep();
  }

}
