import { TestBed, inject } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutService]
    });
  });

  it('should be created', inject([CheckoutService], (service: CheckoutService) => {
    expect(service).toBeTruthy();
  }));
});
