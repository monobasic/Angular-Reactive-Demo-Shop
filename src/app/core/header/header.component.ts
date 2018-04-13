import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../account/shared/auth.service';
import { OffcanvasService } from '../shared/offcanvas.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  user: User;

  constructor(private authService: AuthService,
  private router: Router,
  private offcanvasService: OffcanvasService) {}

  ngOnInit() {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  onLogOut(e: Event) {
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }

  onMenuToggle(e: Event) {
    this.offcanvasService.openOffcanvasNavigation();
    e.preventDefault();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
