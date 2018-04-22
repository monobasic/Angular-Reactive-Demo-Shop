import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../account/shared/auth.service';

import { take } from 'rxjs/operators/take';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map((user) => (user && user.roles.admin ? true : false)),
      tap((authorized) => {
        if (!authorized) {
          this.router.navigate(['/register-login']);
        }
      })
    );
  }
}
