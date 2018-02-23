import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { MessageService } from './messages/message.service';

export interface UserDetails {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  adresses: string[];
  oders: number[];
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private logger: MessageService
  ) {}

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

  isLoggedIn(): boolean {
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
    console.log(arguments);
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/user/${type}`, user);
    } else {
      base = this.http.get(`/api/user/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base.pipe(
      map(
        (data) => this.logger.add(`auth-service: ${JSON.stringify(data)}`),
        (data: TokenResponse) => {
          if (data.token) {
            this.saveToken(data.token);
          }
          return data;
        }
      )
    );
    return request;
  }

  register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  

  login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  adminAuth(): Observable<any> {
    return this.request('get', 'admin-auth');
  }
}
