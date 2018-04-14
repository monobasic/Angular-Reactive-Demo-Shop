import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';
import { MessageService } from '../../messages/message.service';

import { Product } from '../../models/product.model';
import { Rating } from '../../models/rating.model';

@Injectable()
export class ProductRatingService {
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
// pure helper functions start here
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

  calculateOverallRating(product: Product, rating: number): number {
    // Calculate and add new overall rating
    const currentRating =
      <number>Object.values(product.ratings).reduce(
        (a: number, b: number) => a + b,
        0
      ) / Object.values(product.ratings).length;

    return currentRating;
  }
}
