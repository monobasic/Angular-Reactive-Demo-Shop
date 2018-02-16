// TODO: ENABLE FILE-UPLOADING

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../products/shared/product.service';
import { ProductsCacheService } from '../products/shared/products-cache.service';

import { Product } from '../products/shared/product.model';
import { placeholderProduct } from './placeholderProduct';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  id;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productsCacheService: ProductsCacheService
  ) {
    this.product = placeholderProduct;
  }
  ngOnInit(): void {
    this.setProduct();
    this.initForm();
  }
  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      id: new FormControl(this.product.id, [
        Validators.required,
        Validators.min(0)
      ]),
      categories: new FormControl(this.product.categories, Validators.required),
      description: new FormControl(
        this.product.description,
        Validators.required
      ),
      // imageURLs: new FormControl(
      //   this.product.imageURLs || ['img/shop/products/05.jpg']
      // ),
      // photos: new FormControl(),
      price: new FormControl(this.product.price, [
        Validators.required,
        Validators.min(0)
      ]),
      priceNormal: new FormControl(this.product.priceNormal, [
        Validators.required,
        Validators.min(0)
      ])
    });
    this.onChanges();
  }
  onChanges() {
    this.productForm.valueChanges.subscribe((val) => {
      this.syncProduct(val);
    });
  }
  syncProduct(val: Product) {
    const priceNormal = val.priceNormal;
    const price = val.price;

    const calcReduction = Math.round((priceNormal - price) / priceNormal * 100);
    const reduction = calcReduction > 0 ? calcReduction : undefined;

    this.product = {
      ...val,
      reduction,
      date: new Date().toString()
    };
    console.log(this.product);
  }
  setProduct() {
    this.route.params.subscribe((params: Params) => {
      const id = +this.route.snapshot.paramMap.get('id');
      if (id) {
        this.getProduct(id);
      } else {
        this.product = placeholderProduct;
        this.initForm();
      }
    });
  }
  getProduct(id): void {
    this.productsCacheService
      .get(id, this.productService.getProduct(id))
      .subscribe((product) => {
        this.syncProduct(this.product);
        this.initForm();
      });
  }
  onSubmit() {
    this.syncProduct(this.productForm.value);

    this.productService
      .addProduct(this.product)
      .subscribe((val) => console.log(val));
  }
}
