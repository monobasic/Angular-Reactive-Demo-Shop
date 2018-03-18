import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';

import { Product } from '../../models/product.model';
import { placeholderProduct } from './placeholderProduct';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, OnChanges {
  @ViewChild('photos') photos;
  productForm: FormGroup;
  product: Product = placeholderProduct;
  mode: 'edit' | 'add';
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productsCacheService: ProductsCacheService
  ) {}
  ngOnChanges() {
    // this.product = placeholderProduct;
  }
  ngOnInit(): void {
    this.setProduct();
    this.initForm();
  }
  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      id: new FormControl({ value: this.product.id, disabled: true }, [
        Validators.required,
        Validators.min(0)
      ]),
      categories: new FormControl(this.product.categories, Validators.required),
      description: new FormControl(
        this.product.description,
        Validators.required
      ),
      price: new FormControl(this.product.price, [
        Validators.required,
        Validators.min(0)
      ]),
      priceNormal: new FormControl(this.product.priceNormal, [
        Validators.required,
        Validators.min(0)
      ])
    });
    this.onFormChanges();
  }
  onFormChanges() {
    this.productForm.valueChanges.subscribe((val) => {
      const product = { ...this.product, ...val };
      this.syncProduct(product);
    });
  }
  syncProduct(val) {
    // product changed
    // calculate reduction
    // add new date
    // tslint:disable-next-line:no-console
    const randomId = Math.floor(Math.random() * new Date().getTime());
    const id = val.id === 1 ? randomId : val.id;

    const priceNormal = val.priceNormal;
    const price = val.price;

    const calcReduction = Math.round((priceNormal - price) / priceNormal * 100);
    const reduction = calcReduction > 0 ? calcReduction : undefined;

    const categories = val.categories || '';

    const date = new Date().toString();

    this.product = {
      ...val,
      reduction,
      id,
      categories,
      date,
      imageURLs: this.product.imageURLs || []
    };
  }

  setProduct() {
    this.route.params.subscribe((params: Params) => {
      this.id = +this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      // if we're in edit mode, we have an id
      if (this.id) {
        this.mode = 'edit';
        this.getProduct(this.id);
      } else {
        // else we are in add mode and use a placeholder
        this.mode = 'add';
        this.syncProduct(placeholderProduct);
        this.initForm();
      }
    });
  }

  getProduct(id): void {
    this.productService.getProduct(id).subscribe((product) => {
      if (product) {
        this.syncProduct(product);
        this.initForm();
      }
    });
  }

  onSubmit() {
    this.syncProduct({ ...this.product, ...this.productForm.value });
    const formData = new FormData();

    const product = this.product;
    for (const [key, value] of Object.entries(this.product)) {
      formData.append(key, value);
    }

    // const files: FileList = this.photos.nativeElement.files;
    // if (files.length > 0) {
    //   for (const file of Object.values(files)) {
    //     formData.append('photos', file, file.name);
    //   }
    // }
    const newProduct = {
      ...this.product,
      ...this.productForm.value
    };

    if (this.mode === 'add') {
      this.productService.addProduct(newProduct);
    } else {
      this.productService.updateProduct(newProduct);
    }

    // this.productService.addProduct(formData);
    // .subscribe((response) => {
    //   console.log('val: ', response);
    //   this.router.navigateByUrl(`/products/${response.product.id}`);
    // });
  }
  onDelete() {
    if (this.mode === 'edit') {
      console.log('delete ', this.product.id);
    }
  }
}
