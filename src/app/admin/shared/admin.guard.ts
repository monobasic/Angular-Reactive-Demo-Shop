import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../messages/message.service';
import { AuthService } from '../../account/shared/auth.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private log: MessageService,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this.authService.user
      .take(1)
      .map(user => user.roles.admin ? user.roles.admin : false)
      .do(authorized => {
        if (!authorized) {
          console.log('route prevented!');
        }
      });

  }
}
