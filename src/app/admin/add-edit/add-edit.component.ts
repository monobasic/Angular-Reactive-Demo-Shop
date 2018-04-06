import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { FileUploadService } from '../../products/shared/file-upload.service';
import { MessageService } from '../../messages/message.service';
import { ProductService } from '../../products/shared/product.service';

import { Product } from '../../models/product.model';
import { ProductsCacheService } from '../../products/shared/products-cache.service';

// we send and receive categories as {key:true},
// but for the input field we need
// a product with categories of type string
export class DomainProduct extends Product {
  categories: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  @ViewChild('photos') photos;
  productForm: FormGroup;
  product: DomainProduct;
  mode: 'edit' | 'add';
  id;
  percentage: Observable<number>;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private productService: ProductService,
    public fileUploadService: FileUploadService,
    private productsCacheService: ProductsCacheService,
    private log: MessageService
  ) {}

  ngOnInit(): void {
    this.setProduct();
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(
        this.product && this.product.name,
        Validators.required
      ),
      id: new FormControl(
        {
          value: this.product && this.product.id,
          disabled: true
        },
        [Validators.required, Validators.min(0)]
      ),
      date: new FormControl(
        this.product && this.product.date,
        Validators.required
      ),
      categories: new FormControl(
        this.product && this.product.categories,
        Validators.required
      ),
      description: new FormControl(
        this.product && this.product.description,
        Validators.required
      ),
      price: new FormControl(this.product && this.product.price, [
        Validators.required,
        Validators.min(0)
      ]),
      priceNormal: new FormControl(this.product && this.product.priceNormal, [
        Validators.required,
        Validators.min(0)
      ])
    });
    this.onFormChanges();
  }

  setProduct() {
    this.route.params.subscribe((params: Params) => {
      this.id = +this.route.snapshot.paramMap.get('id');
      // if we have an id, we're in edit mode
      if (this.id) {
        this.mode = 'edit';
        this.getProduct(this.id);
        this.initForm();
      } else {
        // else we are in add mode and use a placeholder
        this.mode = 'add';
        this.constructProduct();
        this.initForm();
      }
    });
  }

  constructProduct() {
    const product = this.constructMockProduct();
    product.categories = this.categoriesFromObjectToString(product.categories);
    this.syncProduct(product);
    this.initForm();
  }

  getProduct(id): void {
    this.productService.getProduct(id).subscribe((product) => {
      if (product) {
        product.categories = this.categoriesFromObjectToString(
          product.categories
        );
        console.log(product.categories);
        this.syncProduct(product);
        this.initForm();
      }
    });
  }

  onFormChanges() {
    this.productForm.valueChanges.subscribe((formFieldValues) => {
      const product = { ...this.product, ...formFieldValues };
      this.syncProduct(product);
    });
  }

  syncProduct(product): void {
    const id = this.createId(product);
    const imageURLs = this.handleImageURLs(product);
    const reduction = this.calculateReduction(
      product.priceNormal,
      product.price
    );
    const sale = this.checkForSale(reduction);

    this.product = {
      ...product,
      sale,
      reduction,
      id,
      imageURLs
    };
  }

  onSubmit() {
    this.syncProduct({ ...this.product, ...this.productForm.value });
    const productToSubmit = this.constructProductToSubmit(this.product);
    const files: FileList = this.photos.nativeElement.files;
    if (this.mode === 'add' && files.length > 0) {
      this.addProduct(productToSubmit, files);
    } else if (this.mode === 'edit') {
      this.updateProduct(productToSubmit, files);
    } else {
      this.log.addError('Please provide a file for your product');
      return;
    }
  }

  addProduct(product: Product, files: FileList) {
    this.productService.addProduct({ product, files }).subscribe(
      (savedProduct: Product) => {
        if (savedProduct.id) {
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
        this.router.navigate(['/products/' + response.id]);
      },
      (error) => this.log.addError('Could not update your product')
    );
  }

  onDelete() {
    if (this.mode === 'edit') {
      this.productService.deleteProduct(this.product).then((res) => {
        this.router.navigate(['/products']);
      });
    } else {
      this.log.addError(`Cannot delete new product`);
    }
  }

  // pure helper functions start here:
  constructMockProduct() {
    return new Product();
  }

  constructProductToSubmit(product: DomainProduct): Product {
    return {
      ...product,
      categories: this.categoriesFromStringToObject(product.categories)
    };
  }

  createId(product: Product): number {
    const randomId = Math.floor(Math.random() * new Date().getTime());
    let id = product.id || randomId;
    if (id === 1) {
      id = randomId;
    }
    return id;
  }

  categoriesFromObjectToString(categories: {}): string | null {
    console.log(categories);
    // categories: { key: true, key: true} || {}
    if (Object.keys(categories).length === 0) {
      return 'example, category';
    }
    return Object.keys(categories).reduce(
      (result, currentProduct, index, inputArray) => {
        if (index < inputArray.length - 1) {
          return result + currentProduct + ',';
        }
        return result + currentProduct;
      },
      ''
    );
  }

  categoriesFromStringToObject(categories: string): {} {
    // categories: 'cat1, cat2, cat3' || ''
    if (categories.length === 0) {
      return {};
    }
    return categories
      .split(',')
      .reduce((combinedCategories, currentCategory) => {
        combinedCategories[currentCategory.trim()] = true;
        return combinedCategories;
      }, {});
  }

  checkForSale(reduction: number): boolean {
    return reduction > 0;
  }

  calculateReduction(priceNormal: number, price: number): number {
    const reduction = Math.round((priceNormal - price) / priceNormal * 100);
    return reduction > 0 ? reduction : 0;
  }

  handleImageURLs(product: Product): string[] {
    if (product.imageURLs && product.imageURLs.length > 0) {
      return product.imageURLs;
    }
    return [];
  }
}
