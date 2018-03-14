import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/shared/auth.service';
import { User } from '../../models/user.model';
import { OffcanvasService } from '../shared/offcanvas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
  private router: Router,
  private offcanvasService: OffcanvasService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  onLogOut(e: Event) {
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }

  onMenuToggle(e: Event) {
    this.offcanvasService.openOffcanvasNavigation();
    e.preventDefault();
  }
}
