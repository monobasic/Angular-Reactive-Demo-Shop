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
    user: BehaviorSubject<User>;

    constructor(public authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
  }
}
