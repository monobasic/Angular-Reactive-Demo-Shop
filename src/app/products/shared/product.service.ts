import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../../messages/message.service';
import { Product } from '../../models/product.model';

import { AngularFireDatabase } from 'angularfire2/database';
import { Rating } from '../../models/rating.model';
import { AuthService } from '../../account/shared/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const multipartHeader = {
  headers: new HttpHeaders({ 'Content-Type': '' })
};
multipartHeader.headers.delete('Content-Type');

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
    return this.angularFireDatabase.list<Product>('products').valueChanges().pipe(
      tap((_) => this.log(`fetched Products`)),
      catchError(this.handleError<Product[]>(`getProducts`))
    );
  }
  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.angularFireDatabase.object<Product>(url).valueChanges().pipe(
      tap((_) => this.log(`fetched Product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  rateProduct(product: Product, rating: number) {
    console.log('rate product:');
    console.log(product);
    console.log(rating);
    const url = `${this.productsUrl}/${product.id}`;
    const updates = {};
    updates['/ratings/' + this.authService.getUserUid() + '/'] = rating;
    return this.angularFireDatabase.object<Product>(url).update(updates);
  }

  // TODO: rewrite for Firebase
  /** PUT: update the Product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http
      .put(this.productsUrl, product, httpOptions)
      .pipe(
        tap((_) => this.log(`updated Product id=${product.id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
  /** POST: add a new Product to the server */
  addProduct(data: FormData): Observable<any> {
    console.log('will upload this photos: ', data.getAll('photos'));
    return this.http
      .post<any>(this.productsUrl, data)
      .pipe(
        tap((dbResponse: any) =>
          this.log(`added Product w/ id=${dbResponse.product.id}`)
        ),
        catchError(this.handleError<Product>('addProduct'))
      );
  }
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty Product array.
      return of([]);
    }
    return this.http
      .get<Product[]>(`api/products/?name=${term}`)
      .pipe(
        tap((_) => this.log(`found Productes matching "${term}"`)),
        catchError(this.handleError<Product[]>('searchProducts', []))
      );
  }
  /*
      deleteProduct(product: Product | number): Observable<Product> {
        const id = typeof Product === 'number' ? product : product.id;
        const url = `${this.productsUrl}/${id}`;

        return this.http.delete<Product>(url, httpOptions).pipe(
          tap(_ => this.log(`deleted Product id=${id}`)),
          catchError(this.handleError<Product>('deleteProduct'))
        );
      }
    */
}
