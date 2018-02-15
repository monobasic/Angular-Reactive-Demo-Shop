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

const placeholderProduct: Product = {
  id: 999,
  date: new Date().toString(),
  name: 'Placeholder Product Name',
  description: 'Come up with something descriptive',
  price: 1000,
  priceNormal: 2000,
  imageURLs: ['img/shop/products/13.jpg'],
  categories: ['Some', 'Example', 'Categories'],
  reduction: 50
};

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  productForm: FormGroup;

  product: Product;
  id: any;

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
      imageURLs: new FormControl(null),
      price: new FormGroup({
        price: new FormControl(this.product.price, [
          Validators.required,
          Validators.min(0)
        ]),
        'price-normal': new FormControl(this.product.priceNormal, [
          Validators.required,
          Validators.min(0)
        ]),
        reduction: new FormControl(this.product.reduction)
      })
    });

    this.onChanges();
  }
  onChanges() {
    this.productForm.valueChanges.subscribe((val) => {
      console.log(val);
      console.log(this.product);

      const calcReduction =
        Math.round((val.price['price-normal'] - val.price.price) /
        val.price['price-normal'] *
        100);

      const reduction = calcReduction > 0 ? calcReduction : undefined;

      this.product = {
        id: val.id,
        date: new Date().toString(),
        name: val.name,
        description: val.description,
        price: val.price.price,
        priceNormal: val.price['price-normal'],
        imageURLs: ['img/shop/products/13.jpg'],
        categories: ['Some', 'Example', 'Categories'],
        reduction: reduction
      };
    });
  }
  setProduct() {
    this.route.params.subscribe((params: Params) => {
      this.id = +this.route.snapshot.paramMap.get('id');

      this.getProduct();
    });
  }
  getProduct(): void {
    if (this.id) {
      console.log(this.id);
      // this.productsCacheService
      // .get(this.id, this.productService.getProduct(this.id))
      // .subscribe((product) => {
      //   this.product = product;
      // });
    }
  }
  onSubmit() {
    console.log(this.productForm);
  }
}
