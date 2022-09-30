import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs';

import { Promo } from '../../models/promo.model';

@Injectable()
export class PromoService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getPromos(): Observable<Promo[]> {
    return this.angularFireDatabase.list<Promo>('promos').valueChanges();
  }
}
