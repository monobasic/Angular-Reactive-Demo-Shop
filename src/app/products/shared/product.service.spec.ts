import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';

describe('ProductService', () => {
  beforeEach(() => {
    const httpSpy = jest.fn();
    const routerSpy = jest.fn();
    const messageServiceSpy = jest.fn();
    const angularFireDatabaseSpy = jest.fn();
    const authServiceSpy = jest.fn();
    const uploadServiceSpy = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: FileUploadService, useValue: uploadServiceSpy }
      ]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
