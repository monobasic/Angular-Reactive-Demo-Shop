import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

import { UserDetails } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() user;
  userData: UserDetails;
  formAddress: FormGroup;
  countries: string[];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
      this.initFormGroup();
  }
  initFormGroup() {
    this.countries = ['Switzerland'];
    this.formAddress = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      zip: new FormControl( null, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]
      ),
      city: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      phone: new FormControl(null),
      company: new FormControl(null),
      country: new FormControl({ value: this.countries[0], disabled: false })
    });
  }

  onContinue() {
    this.checkoutService.setCustomer(this.formAddress.value);
    this.checkoutService.nextStep();
  }

  // Debug: Fill Form Helper MEthod
  onFillForm(event: Event) {
    event.preventDefault();
    this.formAddress.setValue({
      firstname: 'Hans',
      lastname: 'Muster',
      address1: 'Musterstrasse 13',
      address2: '',
      zip: 1234,
      city: 'Musterhausen',
      email: 'hans.muster@muster.com',
      phone: '+41791234567',
      company: '',
      country: 'Switzerland'
    });
  }
}
