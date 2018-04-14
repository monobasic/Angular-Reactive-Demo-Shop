import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OffcanvasService {
  public offcanvasNavigationOpen: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);

  public toggleOffcanvasNavigation() {
    const state = !this.offcanvasNavigationOpen.getValue();
    this.offcanvasNavigationOpen.next(state);
    console.log('toggleOffcanvasNavigation() called with: ' + state);
  }

  public openOffcanvasNavigation() {
    this.offcanvasNavigationOpen.next(true);
  }

  public closeOffcanvasNavigation() {
    this.offcanvasNavigationOpen.next(false);
  }
}
