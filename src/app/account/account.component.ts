import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  UrlSegment,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
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
  currentLocation;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService) {}

  ngOnInit() {
    console.log(this.route.snapshot);
    console.log(this.route.children);
    const loc = this.route.params.subscribe((para) => {
      console.log(para);
    });


    this.authService.user.subscribe(user => this.user = user);
    console.log(this.user);

  }
  getLocation() {}
}
