import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../account/shared/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navigation-main',
  templateUrl: './navigation-main.component.html',
  styleUrls: ['./navigation-main.component.scss']
})
export class NavigationMainComponent implements OnInit, OnDestroy {
  user: User;
  authSubscription: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
