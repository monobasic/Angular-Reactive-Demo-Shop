import { Component, OnInit, Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FileUploadService {
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) {}

  startUpload(files: FileList) {
    // The File object
    const file = files.item(0);

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

    // The file's download URL
    this.downloadURL = this.task.downloadURL();

    return this.task;
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
