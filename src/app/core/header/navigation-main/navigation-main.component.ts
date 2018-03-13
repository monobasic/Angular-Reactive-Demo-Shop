import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../account/shared/auth.service';

@Component({
    selector: 'app-navigation-main',
    templateUrl: './navigation-main.component.html',
    styleUrls: ['./navigation-main.component.scss']
})
export class NavigationMainComponent implements OnInit {
    user: User;

    constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
        this.user = user;
    });
  }
}
