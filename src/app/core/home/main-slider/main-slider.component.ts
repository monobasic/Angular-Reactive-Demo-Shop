import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  @Input() items: any[];
  currentSlide: number;
  imagesLoaded: string[];

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
    }
  };

  constructor(private ngxSiemaService: NgxSiemaService) {}

  ngOnInit() {
    this.currentSlide = 0;
    this.imagesLoaded = [];
  }

  prev() {
    if (this.currentSlide > 0) {
      this.ngxSiemaService
        .prev(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.currentSlide = data.currentSlide;
        });
    }
  }

  next() {
    if (this.currentSlide < this.items.length - 1) {
      this.ngxSiemaService
        .next(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.currentSlide = data.currentSlide;
        });
    }
  }

  goTo(index: number) {
    this.ngxSiemaService
      .goTo(index)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.currentSlide = data.currentSlide;
      });
  }

  onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
    console.log(this.imagesLoaded);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
