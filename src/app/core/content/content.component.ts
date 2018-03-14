import { Component, OnInit } from '@angular/core';
import { OffcanvasService } from '../shared/offcanvas.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private offcanvasService: OffcanvasService) { }

  ngOnInit() {
  }

  onMenuClose(e: Event) {
    this.offcanvasService.closeOffcanvasNavigation();
  }

}
