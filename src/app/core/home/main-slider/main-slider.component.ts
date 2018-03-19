import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit, OnChanges {
  @Input()
  items: any[];

  options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: false,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    },
  };

  constructor(private ngxSiemaService: NgxSiemaService) { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  prev() {
    this.ngxSiemaService.prev(1)
      .subscribe((data: any) => console.log(data));
  }

  next() {
    this.ngxSiemaService.next(1)
      .subscribe((data: any) => console.log(data));
  }

  goTo(index: number) {
    this.ngxSiemaService.goTo(index)
      .subscribe((data: any) => console.log(data));
  }

}
