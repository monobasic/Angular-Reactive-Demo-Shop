import { Component, OnInit, Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { by } from 'protractor';
import { tap, concatMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { merge } from 'rxjs/observable/merge';

@Injectable()
export class FileUploadService {
  products$;
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private angularFireDatabase: AngularFireDatabase
  ) {}

  startUpload(data) {
    // The File object
    const file = data.files.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `product-images/${new Date().getTime()}_${file.name}`;

    // The main task
    this.task = this.storage.upload(path, file);

    // The file's download URL
    this.downloadURL = this.task.downloadURL();

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    return this.saveProduct(data);
  }

  saveProduct(data: { product: Product; files: FileList }) {
    return this.snapshot.pipe(
      concatMap((snap) => {
        console.log(snap);
        if (snap.downloadURL) {
          data.product.imageURLs.push(snap.downloadURL);
          data.product.imageRefs.push(snap.metadata.fullPath);
          this.angularFireDatabase
            .list('products')
            .set(data.product.id.toString(), data.product);
          }
          return of(data.product.id);
      })
    );
  }

  deleteFile(key) {
    const path = `product-images/${key}`;
    this.storage
      .ref(path)
      .delete()
      .subscribe((res) => console.log(res));
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
