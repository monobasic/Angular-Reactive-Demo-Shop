import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OffcanvasService {
  offcanvasNavigationOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  toggleOffcanvasNavigation() {
    const state = !this.offcanvasNavigationOpen.getValue();
    this.offcanvasNavigationOpen.next(state);
    console.log('toggleOffcanvasNavigation() called with: ' + state);
  }

  openOffcanvasNavigation() {
    this.offcanvasNavigationOpen.next(true);
  }

  closeOffcanvasNavigation() {
    this.offcanvasNavigationOpen.next(false);
  }

}
