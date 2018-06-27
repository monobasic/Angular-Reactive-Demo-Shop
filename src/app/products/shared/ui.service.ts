import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiService {
  public sorting$: BehaviorSubject<string>;
  public displayMode$: BehaviorSubject<string>;
  public currentPagingPage$: BehaviorSubject<number>;

  constructor() {
    this.sorting$ = new BehaviorSubject('date:reverse');
    this.displayMode$ = new BehaviorSubject('grid');
    this.currentPagingPage$ = new BehaviorSubject(1);
  }
}
