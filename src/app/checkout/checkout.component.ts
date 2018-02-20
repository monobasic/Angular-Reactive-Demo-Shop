import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Order } from '../model/order.model';
import { OrderService } from '../order.service';
import { AddressComponent } from './address/address.component';
import { Customer } from '../model/customer.model';
import { ShippingComponent } from './shipping/shipping.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  activeStep: number;
  steps: string[];
  orderInProgress: Order;
  stepsValidated: number[];

  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;

  @ViewChild(ShippingComponent)
  private shippingComponent: ShippingComponent;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.steps = ['1. Address', '2. Shipping', '3. Payment', '4. Review'];
    this.activeStep = 0;
    this.stepsValidated = [];
    this.orderInProgress = new Order();
  }

  // onStepClicked(event: Event, index: number) {
  //   this.activeStep = index;
  //   event.preventDefault();
  // }

  onStepChanged(step: number) {
    // Validate different steps
    if (step === 1) {
      console.log('validate step 0 (= 1. Address)');
      if (this.addressComponent.formAddress.valid) {

        // Save form data to orderInProgress
        this.orderInProgress.customer = new Customer();
        this.orderInProgress.customer = this.addressComponent.formAddress.value;

        // Set step statue
        if (!this.stepsValidated.includes(step)) {
          this.stepsValidated.push(step);
        }

        // Change step
        this.activeStep = step;
      } else {
        this.validateAllFields(this.addressComponent.formAddress);
      }
    } else if (step === 2) {
      console.log('validate step 1 (= 2. Shipping)');

    } else if (step === 3) {
      console.log('validate step 2 (= 3. Payment)');
    } else {
      this.activeStep = step;
    }

    console.log(this.orderInProgress);

  }

  onCompleteOrder(event: Event) {
    console.log('complete order!');
    this.orderService.addOrder(this.orderInProgress);
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}
