import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/shared/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: BehaviorSubject<User>;
  isAdmin: boolean;

  constructor(private authService: AuthService,
  private router: Router) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.isAdmin = false;
    this.authService.user.subscribe(user => {
      this.isAdmin = user && user.roles.admin;
    });
  }

  onLogOut(e: Event) {
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }
}
