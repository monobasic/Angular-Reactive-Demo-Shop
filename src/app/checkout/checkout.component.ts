import { Component, OnInit, ElementRef } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartSubtotal: number;
  shipping: number;
  orderTotal: number;
  formAddress: FormGroup;
  activeStep: number;
  steps: string[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartSubtotal = this.cartService.getTotal();
    // TODO: shipping
    this.shipping = 9;
    this.orderTotal = this.cartSubtotal + this.shipping;
    this.steps = ['1. Address', '2. Shipping', '3. Payment', '4. Review'];
    this.activeStep = 0;

    // Init Form
    this.formAddress = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'address1': new FormControl(null, Validators.required),
      'address2': new FormControl(null),
      'zip': new FormControl(null, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
      'city': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log('form submit!');
    console.log(this.formAddress.value);
  }

  onStepClicked(event: Event, index: number) {
    this.activeStep = index;
    event.preventDefault();
  }

}
