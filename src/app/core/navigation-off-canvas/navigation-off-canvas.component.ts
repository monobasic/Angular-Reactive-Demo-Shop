import { Component, OnInit } from '@angular/core';
import { OffcanvasService } from '../shared/offcanvas.service';

@Component({
  selector: 'app-navigation-off-canvas',
  templateUrl: './navigation-off-canvas.component.html',
  styleUrls: ['./navigation-off-canvas.component.scss']
})
export class NavigationOffCanvasComponent implements OnInit {

  constructor(public offcanvasService: OffcanvasService) { }

  ngOnInit() {
  }

}
