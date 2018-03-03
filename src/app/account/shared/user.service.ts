import User from '../../models/user.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { MessageService } from '../../messages/message.service';

import { UserDetails } from '../../models/user.model';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
}

@Injectable()
export class UserService implements OnInit {
  private token: string;
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoggedIn = this._isLoggedIn.asObservable();

  private _user: BehaviorSubject<any> = new BehaviorSubject({});
  public user = this._user.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private logger: MessageService
  ) {
    this._user.next(this.getUserDetails());
    this._isLoggedIn.next(this.getLoginState());
  }

  ngOnInit() {}

  saveToken(token: string) {
    localStorage.setItem('unishop-token', token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('unishop-token');
    }
    return this.token;
  }

  logout(): void {
    this.token = '';
    window.localStorage.removeItem('unishop-token');
    this.router.navigateByUrl('/');
  }

  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  getLoginState(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  request(
    method: 'post' | 'get',
    type: 'login' | 'register' | 'profile' | 'admin-auth',
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (type === 'admin-auth') {
      base = this.http.get(`/api/admin-auth`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    } else if (type === 'register') {
      base = this.http.post(`/api/user/`, user);
    } else if (type === 'login') {
      base = this.http.post(`/api/user/login`, user);
    } else if (method === 'get') {
      base = this.http.get(`/api/user/`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base.pipe(
      tap((data) => {
        return of(data);
      }),
      tap((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return of(data);
      }),
      catchError((error, result) => {
        return of(error);
      })
    );
    return request;
  }

  register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user).pipe(
      tap((response) => {
        console.log(response);
        console.log(this.isLoggedIn);
        if (response.success) {
          this._isLoggedIn.next(true);
        } else {
          this._isLoggedIn.next(false);
        }
      })
    );
  }

  profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  adminAuth(): Observable<any> {
    return this.request('get', 'admin-auth');
  }
}
