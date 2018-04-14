import { Component } from '@angular/core';
import { OffcanvasService } from './core/shared/offcanvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public products: any;

  constructor(public offcanvasService: OffcanvasService) {}
}
