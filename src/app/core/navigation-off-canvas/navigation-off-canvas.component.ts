import { Component, OnInit } from '@angular/core';
import { OffcanvasService } from '../shared/offcanvas.service';
import { AuthService } from '../../account/shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navigation-off-canvas',
  templateUrl: './navigation-off-canvas.component.html',
  styleUrls: ['./navigation-off-canvas.component.scss']
})
export class NavigationOffCanvasComponent implements OnInit {
  user: User;

  constructor(public offcanvasService: OffcanvasService,
    public authService: AuthService,
    private router: Router) { }

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
}
