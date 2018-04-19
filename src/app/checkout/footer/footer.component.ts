import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() buttons: string[];
  @Input() continueEnabled: boolean;
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() completeOrder: EventEmitter<void> = new EventEmitter<void>();

  onBack(e: Event) {
    this.back.emit();
  }

  onContinue(e: Event) {
    this.continue.emit();
  }

  onCompleteOrder(e: Event) {
    this.completeOrder.emit();
  }
}
