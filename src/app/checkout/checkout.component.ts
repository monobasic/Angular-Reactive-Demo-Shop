import { Component, OnInit, ElementRef } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  activeStep: number;
  steps: string[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.steps = ['1. Address', '2. Shipping', '3. Payment', '4. Review'];
    this.activeStep = 0;
  }


  onStepClicked(event: Event, index: number) {
    this.activeStep = index;
    event.preventDefault();
  }

  onStepChanged(step: number) {
    this.activeStep = step;
  }

}
