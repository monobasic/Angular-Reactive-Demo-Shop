import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  @Input() public user;
  public formAddress: UntypedFormGroup;
  public countries: string[];

  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initFormGroup();

    this.authSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.initFormGroup();
      }
    });
  }

  private initFormGroup() {
    this.countries = ['Switzerland'];
    this.formAddress = new UntypedFormGroup({
      firstname: new UntypedFormControl(
        this.user && this.user.firstName,
        Validators.required
      ),
      lastname: new UntypedFormControl(
        this.user && this.user.lastName,
        Validators.required
      ),
      address1: new UntypedFormControl(null, Validators.required),
      address2: new UntypedFormControl(null),
      zip: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(/^\d\d\d\d$/)
      ]),
      city: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(
        this.user && this.user.email,
        Validators.email
      ),
      phone: new UntypedFormControl(null),
      company: new UntypedFormControl(null),
      country: new UntypedFormControl({ value: this.countries[0], disabled: false })
    });
  }

  public onContinue() {
    this.checkoutService.setCustomer(this.formAddress.value);
    this.checkoutService.nextStep();
  }

  // Debug: Fill Form Helper MEthod
  public onFillForm(event: Event) {
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

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
