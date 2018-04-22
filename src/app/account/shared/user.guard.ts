import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      tap((user) => {
        console.log('user from guard: ');
        console.log(user);
      }),
      map((user) => (user ? true : false)),
      tap((authorized) => {
        if (!authorized) {
          console.log('route prevented!');
          this.router.navigate(['/register-login']);
        }
      })
    );
  }
}
