import { Component, OnInit, Input } from '@angular/core';
import { Promo } from '../../../models/promo.model';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  @Input()
  promo: Promo;

  constructor() { }

  ngOnInit() {
  }

}
