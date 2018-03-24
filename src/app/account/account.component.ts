import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { OrderService } from './orders/shared/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    public router: Router,
    public orderService: OrderService
  ) {}

  ngOnInit() {}
}
