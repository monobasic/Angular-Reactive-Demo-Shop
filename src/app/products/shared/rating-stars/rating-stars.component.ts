import { Component, OnInit, Input } from '@angular/core';
import { Rating } from '../../../models/rating.model';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {
  @Input()
  ratings: Rating[];
  ratingResult: number;

  constructor() { }

  ngOnInit() {
    if (this.ratings) {
      this.ratingResult = Math.ceil(this.ratings.map((a) => a.rating).reduce((a, b) => a + b) / this.ratings.length);
    }
  }

}
