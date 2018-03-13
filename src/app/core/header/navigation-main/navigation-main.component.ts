import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../account/shared/auth.service';

@Component({
    selector: 'app-navigation-main',
    templateUrl: './navigation-main.component.html',
    styleUrls: ['./navigation-main.component.scss']
})
export class NavigationMainComponent implements OnInit {
    isAdmin: boolean;

    constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = false;
    this.authService.user.subscribe(user => {
        this.isAdmin = user ? user.roles.admin : false;
    });
  }
}
