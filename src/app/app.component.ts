import { Component, OnInit } from '@angular/core';
import { OffcanvasService } from './core/shared/offcanvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: any;

  constructor(
    public offcanvasService: OffcanvasService
  ) {}

  ngOnInit() {}
}
