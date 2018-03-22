import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent implements OnInit {
  @Input()
  products: Product[];
  @Input()
  widgetTitle: string;

  constructor() { }

  ngOnInit() {}

}
