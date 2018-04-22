import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.user
      .take(1)
      .do(user => {
        console.log('user from guard: ');
        console.log(user);
      })
      .map(user => user ? true : false)
      .do(authorized => {
        if (!authorized) {
          console.log('route prevented!');
          this.router.navigate(['/register-login']);
        }
     });
  }
}
