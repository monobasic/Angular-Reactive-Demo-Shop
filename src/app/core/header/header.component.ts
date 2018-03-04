import { Component, OnInit } from '@angular/core';
import { UserService } from '../../account/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  userInfo;
  //  = this.auth.user.subscribe((user) => {
  //   console.log(user);
  //   this.userInfo = user;
  // });

  constructor(private auth: UserService) {}

  ngOnInit() {
    this.getUserState();
    this.getUserInfo();
  }

  getUserState() {
    const authSubscribtion = this.auth.isLoggedIn.subscribe((userState) => {
      this.isLoggedIn = userState;
    });
  }
  getUserInfo() {
    return this.auth.user.subscribe((user) => {
      this.userInfo = user;
    });
  }
  onLogOut() {
    this.auth.logout();
  }
}
