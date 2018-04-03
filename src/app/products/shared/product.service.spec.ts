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
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient },
        { provide: Router },
        { provide: MessageService },
        { provide: AngularFireDatabase },
        { provide: AuthService },
        { provide: FileUploadService },
      ]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});