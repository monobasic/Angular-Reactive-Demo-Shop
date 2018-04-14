import { Component } from '@angular/core';

import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { OrderService } from './orders/shared/order.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public user: User;

  constructor(
    private authService: AuthService,
    public router: Router,
    public orderService: OrderService
  ) {}
}
