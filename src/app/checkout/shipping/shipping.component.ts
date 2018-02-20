import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../checkout.service';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  formShipping: FormGroup;
  shippingMethods: {method: string, time: string, fee: number, value: string}[];

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.shippingMethods = [
      {
        method: 'Swiss Post Priority',
        time: '1 - 2 days',
        fee: 11,
        value: 'priority'
      },
      {
        method: 'Swiss Post Economy',
        time: 'up to one week',
        fee: 9,
        value: 'economy'
      }
    ]
    this.formShipping = new FormGroup({
      'shippingMethod': new FormControl(this.shippingMethods[1].value, Validators.required)
    });
  }

  onContinue() {
    this.checkoutService.orderInProgress.shippingMethod = this.formShipping.controls.shippingMethod.value;
    console.log(this.checkoutService.orderInProgress);

    // Goto next step...
    this.checkoutService.changeStep(2);
  }

}
