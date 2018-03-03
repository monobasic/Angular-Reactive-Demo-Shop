import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../account/shared/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userState: boolean;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getUserState();
  }

  getUserState() {
    const authSubscribtion = this.auth.isLoggedIn()
      .subscribe(response => {
        this.userState = response;
      });
  }

}
