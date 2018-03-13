import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Rating } from '../../../models/rating.model';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, OnChanges {
  @Input()
  ratings: {};
  ratingResult: number;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.ratings) {
      this.ratingResult = <number>Object.values(this.ratings)
      .reduce((a: number, b: number) => a + b, 0) / Object.values(this.ratings).length;
    }
  }

}
