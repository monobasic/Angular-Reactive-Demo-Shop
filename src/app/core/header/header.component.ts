import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/shared/auth.service';
import { Observable } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  userEmail: string;

  //  = this.auth.user.subscribe((user) => {
  //   console.log(user);
  //   this.userInfo = user;
  // });

  constructor(private authService: AuthService,
  private router: Router) {}

  ngOnInit() {
    this.authService.currentUserObservable.subscribe((authState) => {
      this.isLoggedIn = authState !== null;
      this.userEmail = authState !== null ? authState.email : 'Anonymous';
      console.log(`isLoggedIn: ${this.isLoggedIn}`);
      console.log(authState);
    });
  }

  onLogOut(e: Event) {
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }
}
