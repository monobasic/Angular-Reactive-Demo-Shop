import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }
}
