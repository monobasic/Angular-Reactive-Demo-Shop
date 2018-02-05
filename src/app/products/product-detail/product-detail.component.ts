import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  activeImageUrl: string;

  constructor(private route: ActivatedRoute, private productService: ProductService, private location: Location) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.productService.getProduct(id)
    .subscribe(product => {
      this.product = product;
      this.activeImageUrl = this.product.imageURLs[0];
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSelectThumbnail(e) {
    e.preventDefault();
    console.log(e);
    //this.activeImageUrl = this.product.imageURLs[0];
  }

//  save(): void {
//    this.productService.updateProduct(this.product)
//      .subscribe(() => this.goBack());
// }
}
