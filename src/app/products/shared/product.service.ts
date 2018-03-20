import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';

import { MessageService } from '../../messages/message.service';
import { Product } from '../../models/product.model';

import { AngularFireDatabase } from 'angularfire2/database';
import { Rating } from '../../models/rating.model';
import { AuthService } from '../../account/shared/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
  private productsUrl = '/products'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }

  private simulateHttp(val: any, delay: number) {
    return Observable.of(val).delay(delay);
  }

  private simulateFirebase(val: any, delay: number) {
    return Observable.interval(delay).map(index => val + ' ' + index);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products')
      .valueChanges()
      .pipe(
        //tap(() => this.log(`fetched Products`)),
        catchError(this.handleError<Product[]>(`getProducts`))
      );
  }

  getFeaturedProducts(): Observable<any[]> {
    return this.angularFireDatabase.list<Product>('featured')
      .snapshotChanges()
      .switchMap(
        actions => {
          return Observable.combineLatest(actions.map(action => this.getProduct(action.key)));
        },
        (actionsFromSource, resolvedProducts) => {
          const combinedProducts = resolvedProducts.map((product, i) => {
            product['imageFeaturedUrl'] = actionsFromSource[i].payload.val().imageUrl;
            return product;
          });
          return resolvedProducts;
        }
      );
  }


  /** GET product by id. Will 404 if id not found */
  getProduct(id: any): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.angularFireDatabase
      .object<Product>(url)
      .valueChanges()
      .pipe(
        // tap(() => this.log(`fetched Product id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  rateProduct(product: Product, rating: number) {
    const url = `${this.productsUrl}/${product.id}`;
    const updates = {};
    updates['/ratings/' + this.authService.getUserUid() + '/'] = rating;
    return this.angularFireDatabase
      .object<Product>(url)
      .update(updates)
      .then(() => this.log(`Rated Product ${product.name} width: ${rating}`))
      .catch((error) => {
        this.handleError<any>(error);
      });
  }

  /** PUT: update the Product on the server */
  updateProduct(data: {product: Product, files: FileList}) {
    const url = `${this.productsUrl}/${data.product.id}`;
    return this.angularFireDatabase
      .object<Product>(url)
      .update(data.product)
      .then(() => this.log(`Updated Product ${data.product.name}`))
      .catch((error) => {
        this.handleError<any>(error);
      });
  }

  /** POST: add a new Product to the server */
  addProduct(data: {product: Product, files: FileList}) {
    return this.angularFireDatabase
      .list<Product>('products')
      .set(data.product.id.toString(), data.product)
      .then((response) => {
        console.log('uploaded', data.product);
        return response;
      });
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty Product array.
      return of([]);
    }
    return this.http
      .get<Product[]>(`api/products/?name=${term}`)
      .pipe(
        tap(() => this.log(`found Productes matching "${term}"`)),
        catchError(this.handleError<Product[]>('searchProducts', []))
      );
  }

  deleteProduct(id: number) {
    const url = `${this.productsUrl}/${id}`;

    return this.angularFireDatabase
      .object<Product>(url)
      .remove()
      .then(() => this.log('success deleting' + id))
      .catch(error => this.handleError('delete product'));
  }
}
