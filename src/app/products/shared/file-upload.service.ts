import { Component, OnInit, Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FileUploadService {
  task$: AngularFireUploadTask;

  // Progress monitoring
  percentage$: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  constructor(public storage: AngularFireStorage) {}

  startUpload(data) {
      // The File object
      const file = data.files.item(0);

      // Client-side validation example
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        throw new Error('upload failed, unsupported file type');
      }

      // The storage path
      const path = `product-images/${new Date().getTime()}_${file}`;

      // The main task
      this.task$ = this.storage.upload(path, file);

      // the percentage
      this.percentage$ = this.task$.percentageChanges();

      return this.task$;
  }

  deleteFile(files: string[]) {
    if (files) {
      return files.map((filePath) => {
        return this.storage.ref(filePath).delete();
      });
    }
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
