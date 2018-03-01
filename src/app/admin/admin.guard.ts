import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../messages/message.service';
import { AdminAuthService } from './admin-auth.service';
import { createProduct } from '../../../server/ts-source/controller/products.controller';
import { AuthenticationService } from '../account/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private log: MessageService,
    private adminAuthService: AdminAuthService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.log.add('Authenticated');

    return Observable.create((obs) => {
      const auth = this.authenticationService.adminAuth()
      .subscribe((answer) => {
        if (answer.auth) {
          obs.next(true);
        } else {
          obs.next(false);
        }
      });
    });
  }
}
