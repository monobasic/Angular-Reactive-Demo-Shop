import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './messages/message.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private log: MessageService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.log.add('Authenticated');
    return true;
  }
}
