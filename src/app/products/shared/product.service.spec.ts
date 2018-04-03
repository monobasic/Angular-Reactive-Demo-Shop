import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';
import { of } from 'rxjs/observable/of';

class AngularFireDatabaseMock {
  list(query: string): any {
    return {
      valueChanges() {
        return of([
          {
            date: 12345,
            name: 'Hello World'
          },
          {
            date: 456779,
            name: 'Hola Mundo'
          }
        ]);
      }
    };
  }
}

describe('ProductService', () => {
  let productService: ProductService;
  let angularFireDatabase: AngularFireDatabase;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient },
        { provide: Router },
        { provide: MessageService },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AuthService },
        { provide: FileUploadService },
      ]
    });

    productService = TestBed.get(ProductService);
    angularFireDatabase = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });


  it('getProducts()', () => {
    spyOn(angularFireDatabase, 'list');
    productService.getProducts();
    expect(angularFireDatabase.list).toHaveBeenCalled();
  });
});
