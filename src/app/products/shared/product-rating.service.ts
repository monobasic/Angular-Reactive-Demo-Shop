import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable ,  from as fromPromise ,  of } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { MessageService } from '../../messages/message.service';
import { FileUploadService } from './file-upload.service';

import { ProductsUrl } from './productsUrl';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Injectable()
export class ProductRatingService {
  private productsUrl = ProductsUrl.productsUrl;
  private user: User;

  constructor(
    private messageService: MessageService,
    private angularFireDatabase: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.authService.user.subscribe(user => this.user = user);
  }

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

  public rateProduct(product: Product, rating: number) {
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
  private constructRating(product: Product, rating: number) {
    // construct container for update content
    const updates = {};

    // Add user rating to local version of ratings
    if (product.ratings) {
      product.ratings[this.user.uid] = rating;
    } else {
      product['ratings'] = [];
      product['ratings'][this.user.uid] = rating;
    }

    // Add user rating
    updates['/ratings/' + this.user.uid + '/'] = rating;

    // calculate current overall rating
    updates['/currentRating/'] = this.calculateOverallRating(product, rating);
    return updates;
  }

  private calculateOverallRating(product: Product, rating: number): number {
    // Calculate and add new overall rating
    const currentRating =
      <number>Object.values(product.ratings).reduce(
        (a: number, b: number) => a + b,
        0
      ) / Object.values(product.ratings).length;

    return currentRating;
  }
}
