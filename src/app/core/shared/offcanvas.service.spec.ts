import { TestBed, inject } from '@angular/core/testing';

import { OffcanvasService } from './offcanvas.service';

describe('OffcanvasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffcanvasService]
    });
  });

  it('should be created', inject([OffcanvasService], (service: OffcanvasService) => {
    expect(service).toBeTruthy();
  }));
});
