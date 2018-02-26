import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../checkout.service';

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
    this.user.subscribe((response) => {
      console.log(response);
      this.userData = response.user;
      this.initFormGroup();
    });
  }
  initFormGroup() {
    const user = this.userData;

    this.countries = ['Switzerland'];
    this.formAddress = new FormGroup({
      firstname: new FormControl(user.firstName, Validators.required),
      lastname: new FormControl(user.lastName, Validators.required),
      address1: new FormControl(user.adresses[0].adress1, Validators.required),
      address2: new FormControl(null),
      zip: new FormControl(user.adresses[0].zip, [
        Validators.required,
        Validators.pattern(/^\d\d\d\d$/)
      ]),
      city: new FormControl(user.adresses[0].city, Validators.required),
      email: new FormControl(user.email, Validators.email),
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
