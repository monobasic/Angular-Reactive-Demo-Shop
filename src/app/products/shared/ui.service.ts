import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UiService {

  sorting$: BehaviorSubject<string>;
  displayMode$: BehaviorSubject<string>;

  constructor() {
    this.sorting$ = new BehaviorSubject('date:reverse');
    this.displayMode$ = new BehaviorSubject('grid');
  }

}
