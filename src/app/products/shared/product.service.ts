import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import 'rxjs/add/observable/combineLatest';

import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';
import { MessageService } from '../../messages/message.service';

import { Product } from '../../models/product.model';
import { Rating } from '../../models/rating.model';

@Injectable()
export class ProductService {
  private productsUrl = '/products'; // firebase-bucket

  constructor(
    private messageService: MessageService,
    private angularFireDatabase: AngularFireDatabase,
    public authService: AuthService,
    private uploadService: FileUploadService
  ) {}

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) => ref.orderByChild('date'))
      .valueChanges()
      .map((arr) => arr.reverse())
      .pipe(catchError(this.handleError<Product[]>(`getProducts`)));
  }

  getProductsQuery(
    byChild: string,
    equalTo: string | boolean,
    limitToFirst: number
  ): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref
          .orderByChild(byChild)
          .equalTo(equalTo)
          .limitToFirst(limitToFirst)
      )
      .valueChanges()
      .pipe(catchError(this.handleError<Product[]>(`getProductsQuery`)));
  }

  getProductsByDate(limitToLast: number): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref.orderByChild('date').limitToLast(limitToLast)
      )
      .valueChanges()
      .map((arr) => arr.reverse())
      .pipe(catchError(this.handleError<Product[]>(`getProductsByDate`)));
  }

  getProductsByRating(limitToLast: number): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref.orderByChild('currentRating').limitToLast(limitToLast)
      )
      .valueChanges()
      .map((arr) => arr.reverse())
      .pipe(catchError(this.handleError<Product[]>(`getProductsByRating`)));
  }

  getFeaturedProducts(): Observable<any[]> {
    return this.angularFireDatabase
      .list<Product>('featured')
      .snapshotChanges()
      .switchMap(
        (actions) => {
          return Observable.combineLatest(
            actions.map((action) => this.getProduct(action.key))
          );
        },
        (actionsFromSource, resolvedProducts) => {
          const combinedProducts = resolvedProducts.map((product, i) => {
            product['imageFeaturedUrl'] = actionsFromSource[
              i
            ].payload.val().imageFeaturedUrl;
            return product;
          });
          return resolvedProducts;
        }
      )
      .pipe(catchError(this.handleError<Product[]>(`getFeaturedProducts`)));
  }

  getProduct(id: any): Observable<Product | null> {
    const url = `${this.productsUrl}/${id}`;
    return this.angularFireDatabase
      .object<Product>(url)
      .valueChanges()
      .pipe(
        tap((result) => {
          if (result) {
            return of(result);
          } else {
            this.messageService.addError(`Found no Product with id=${id}`);
            return of(null);
          }
        }),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  calculateOverallRating(product: Product, rating: number): number {
    // Calculate and add new overall rating
    const currentRating = <number>Object.values(product.ratings)
    .reduce((a: number, b: number) => a + b, 0) / Object.values(product.ratings).length;

    return currentRating;
  }

  constructRating(product: Product, rating: number) {
    // construct container for update content
    const updates = {};

    // Add user rating to local version of ratings
    if (product.ratings) {
      product.ratings[this.authService.getUserUid()] = rating;
    } else {
      product['ratings'] = [];
      product['ratings'][this.authService.getUserUid()] = rating;
    }

    // Add user rating
    updates['/ratings/' + this.authService.getUserUid() + '/'] = rating;

    // calculate current overall rating
    updates['/currentRating/'] = this.calculateOverallRating(product, rating);
    return updates;
  }

  rateProduct(product: Product, rating: number) {
    const url = `${this.productsUrl}/${product.id}`;
    const updates = this.constructRating(product, rating);

    return fromPromise(
      this.angularFireDatabase
        .object<Product>(url)
        .update(updates)
        .then(() => this.log(`Rated Product ${product.name} width: ${rating}`))
        .catch((error) => {
          this.handleError<any>(error);
        })
    );
  }

  updateProduct(data: { product: Product; files: FileList }) {
    const url = `${this.productsUrl}/${data.product.id}`;

    if (!data.files.length) {
      return this.updateProductWithoutNewImage(data.product, url);
    }

    const dbOperation = this.uploadService
      .startUpload(data)
      .then((task) => {
        data.product.imageURLs[0] = task.downloadURL;
        data.product.imageRefs[0] = task.ref.fullPath;

        return data;
      })
      .then((dataWithImagePath) => {
        return this.angularFireDatabase
          .object<Product>(url)
          .update(data.product);
      })
      .then((response) => {
        this.log(`Updated Product ${data.product.name}`);
        return data.product;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  updateProductWithoutNewImage(product: Product, url: string) {
    const dbOperation = this.angularFireDatabase
      .object<Product>(url)
      .update(product)
      .then((response) => {
        this.log(`Updated Product ${product.name}`);
        return product;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  addProduct(data: { product: Product; files: FileList }) {
    const dbOperation = this.uploadService
      .startUpload(data)
      .then((task) => {
        console.log(task);
        console.log(data);
        data.product.imageURLs.push(task.downloadURL);
        data.product.imageRefs.push(task.ref.fullPath);

        return this.angularFireDatabase
          .list('products')
          .set(data.product.id.toString(), data.product);
      }, (error) => error)
      .then((response) => {
        this.log(`Added Product ${data.product.name}`);
        return data.product;
      })
      .catch((error) => {
        this.messageService.addError(
          `Add Failed, Product ${data.product.name}`
        );
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  deleteProduct(product: Product) {
    const url = `${this.productsUrl}/${product.id}`;

    this.uploadService.deleteFile(product.imageRefs);

    return this.angularFireDatabase
      .object<Product>(url)
      .remove()
      .then(() => this.log('success deleting' + product.name))
      .catch((error) => {
        this.messageService.addError('Delete failed ' + product.name);
        this.handleError('delete product');
      });
  }
}
