import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userEmail: string;

  constructor(private authService: AuthService,
  private router: Router) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isLoggedIn = user !== null;
      this.userEmail = user !== null ? user.email : 'Anonymous';
      this.isAdmin = user !== null ? user.roles.admin : false;
    });
  }

  onLogOut(e: Event) {
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }
}
