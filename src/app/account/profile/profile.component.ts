import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: BehaviorSubject<User>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

}
