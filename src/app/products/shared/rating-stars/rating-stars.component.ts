import { Component, OnInit, Input } from '@angular/core';
import { Rating } from '../../../models/rating.model';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {
  @Input()
  rating: number;

  constructor() { }

  ngOnInit() {}

}
