import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { take ,  tap ,  map } from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map((user) => (user ? true : false)),
      tap((authorized) => {
        if (!authorized) {
          this.router.navigate(['/register-login']);
        }
      })
    );
  }
}
