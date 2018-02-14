import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input()
  activeStep: number;

  @Output()
  changedStep: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeStep(step: number) {
    this.changedStep.emit(step);
  }

}
