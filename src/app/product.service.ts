import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './core/messages/message.service';

import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
  private productsUrl = 'api/products';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
      tap(products => this.log(`fetched products`)),
      catchError(this.handleError('getProducts', []))
      );
  }
  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
  const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched Product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  /** PUT: update the Product on the server */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, Product, httpOptions).pipe(
      tap(_ => this.log(`updated Product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

 /** POST: add a new Product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, Product, httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added Product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  searchProductes(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty Product array.
      return of([]);
    }
    return this.http.get<Product[]>(`api/products/?name=${term}`).pipe(
      tap(_ => this.log(`found Productes matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProductes', []))
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
