import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';
import { MessageService } from '../../messages/message.service';
import { FileUploadService } from '../../products/shared/file-upload.service';

import { Product } from '../../models/product.model';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  @ViewChild('photos') photos;
  productForm: FormGroup;
  product: Product;
  mode: 'edit' | 'add';
  id;
  percentage: Observable<number>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public fileUploadService: FileUploadService,
    private productsCacheService: ProductsCacheService,
    private log: MessageService
  ) {
    this.product = this.constructMockProduct();
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
      date: new FormControl(this.product.date, Validators.required),
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
    let id = val.id || randomId;
    if (id === 1) {
      id = randomId;
    }

    const priceNormal = val.priceNormal;
    const price = val.price;

    const calcReduction = Math.round((priceNormal - price) / priceNormal * 100);
    const reduction = calcReduction > 0 ? calcReduction : 0;
    const sale = calcReduction > 0 ? true : false;

    const categories = val.categories || '';

    const imageURLs =
      val.imageURLs && val.imageURLs.length > 0 ? val.imageURLs : [];

    this.product = {
      ...val,
      sale,
      reduction,
      id,
      categories,
      imageURLs
    };
  }

  setProduct() {
    this.route.params.subscribe((params: Params) => {
      this.id = +this.route.snapshot.paramMap.get('id');
      // if we're in edit mode, we have an id
      if (this.id) {
        this.mode = 'edit';
        this.getProduct(this.id);
      } else {
        // else we are in add mode and use a placeholder
        this.mode = 'add';
        this.syncProduct(this.constructMockProduct());
        this.initForm();
      }
    });
  }

  constructMockProduct() {
    return new Product();
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
    const files: FileList = this.photos.nativeElement.files;

    const product = { ...this.product, ...this.productForm.value };

    if (this.mode === 'add' && files.length > 0) {
      this.addProduct(product, files);
    } else if (this.mode === 'edit') {
      this.updateProduct(product, files);
    } else {
      this.log.addError('Please provide a file for your product');
      return;
    }
  }

  addProduct(product: Product, files: FileList) {
    this.productService.addProduct({ product, files }).subscribe(
      (savedProduct: Product) => {
        if (savedProduct.id) {
          console.log(savedProduct);
          this.product = null;
          this.router.navigate(['/products/' + savedProduct.id]);
        }
      },
      (error) => {
        this.log.addError('Could not upload your product');
        return of(error);
      }
    );
  }

  updateProduct(product: Product, files?: FileList) {
    this.productService.updateProduct({ product, files }).subscribe(
      (response: Product) => {
        console.log(response);
        this.router.navigate(['/products/' + response.id]);
      },
      (error) => this.log.addError('Could not update your product')
    );
  }

  onDelete() {
    if (this.mode === 'edit') {
      this.productService.deleteProduct(this.product).then((res) => {
        console.log(res);
        this.router.navigate(['/products']);
      });
    } else {
      this.log.addError(`Cannot delete new product`);
    }
  }
}
