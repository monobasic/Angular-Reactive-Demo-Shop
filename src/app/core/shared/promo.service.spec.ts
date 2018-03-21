import { TestBed, inject } from '@angular/core/testing';

import { PromoService } from './promo.service';

describe('PromoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromoService]
    });
  });

  it('should be created', inject([PromoService], (service: PromoService) => {
    expect(service).toBeTruthy();
  }));
});
