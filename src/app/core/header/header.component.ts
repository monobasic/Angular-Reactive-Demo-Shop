import { Component, OnInit } from '@angular/core';
import { UserService } from '../../account/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private auth: UserService) { }

  ngOnInit() {
    this.getUserState();
  }

  getUserState() {
    const authSubscribtion = this.auth.isLoggedIn
      .subscribe(userState => {
        this.isLoggedIn = userState;
        console.log(userState);
      });
  }
  onLogOut() {
    this.auth.logout();
  }
}
