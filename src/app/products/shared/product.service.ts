
import {combineLatest as observableCombineLatest,  Observable ,  from as fromPromise ,  of } from 'rxjs';
import { Injectable } from '@angular/core';

import { catchError ,  tap, switchMap, map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';
import { MessageService } from '../../messages/message.service';
import { ProductRatingService } from './product-rating.service';

import { Product } from '../../models/product.model';
import { ProductsUrl } from './productsUrl';

@Injectable()
export class ProductService {
  private productsUrl = ProductsUrl.productsUrl;

  constructor(
    private messageService: MessageService,
    private angularFireDatabase: AngularFireDatabase,
    public authService: AuthService,
    private uploadService: FileUploadService,
    private productRatingService: ProductRatingService
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

  public getProducts(): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) => ref.orderByChild('date'))
      .valueChanges()
      .pipe(map((arr) => arr.reverse()), catchError(this.handleError<Product[]>(`getProducts`)));
  }

  public getProductsQuery(
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

  public findProducts(term): Observable<any> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref
          .orderByChild('name')
          .startAt(term)
          .endAt(term + '\uf8ff')
      )
      .valueChanges()
      .pipe(catchError(this.handleError<Product[]>(`getProductsQuery`)));
  }

  public getProductsByDate(limitToLast: number): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref.orderByChild('date').limitToLast(limitToLast)
      )
      .valueChanges()
        .pipe(
          map((arr) => arr.reverse()),
          catchError(this.handleError<Product[]>(`getProductsByDate`))
        );
  }

  public getProductsByRating(limitToLast: number): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref.orderByChild('currentRating').limitToLast(limitToLast)
      )
      .valueChanges()
      .pipe(map((arr) => arr.reverse()), catchError(this.handleError<Product[]>(`getProductsByRating`)));
  }

  public getFeaturedProducts(): Observable<any[]> {
    return this.angularFireDatabase
      .list<Product>('featured')
      .snapshotChanges()
      .pipe(
        switchMap(
          (actions) => {
            return observableCombineLatest(
              actions.map((action) => this.getProduct(action.key))
            );
          },
          (actionsFromSource, resolvedProducts) => {
            resolvedProducts.map((product, i) => {
              product['imageFeaturedUrl'] = actionsFromSource[
                i
              ].payload.val().imageFeaturedUrl;
              return product;
            });
            return resolvedProducts;
          }
        ),
        catchError(this.handleError<Product[]>(`getFeaturedProducts`)));
  }

  public getProduct(id: any): Observable<Product | null> {
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

  public updateProduct(data: { product: Product; files: FileList }) {
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

  private updateProductWithoutNewImage(product: Product, url: string) {
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

  public addProduct(data: { product: Product; files: FileList }) {
    const dbOperation = this.uploadService
      .startUpload(data)
      .then((task) => {
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

  public deleteProduct(product: Product) {
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
