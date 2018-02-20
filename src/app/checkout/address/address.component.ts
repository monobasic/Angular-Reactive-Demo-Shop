import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  formAddress: FormGroup;
  countries: { name: string, value: string; }[];

  constructor() { }

  ngOnInit() {
    // Init Form
    this.formAddress = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'address1': new FormControl(null, Validators.required),
      'address2': new FormControl(null),
      'zip': new FormControl(null, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
      'city': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      'phone': new FormControl(null),
      'company': new FormControl(null),
      'country': new FormControl({ value: 'switzerland', disabled: true}, Validators.required)
    });

    this.countries = [{
        name: 'Switzerland',
        value: 'switzerland'
    }];
  }
}
