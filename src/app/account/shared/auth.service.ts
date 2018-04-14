import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MessageService } from '../../messages/message.service';
import { User, Roles } from '../../models/user.model';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class AuthService implements OnDestroy {
  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  private unsubscribe$ = new Subject();

  private userUid: string;

  private privateUserUid$: BehaviorSubject<string> = new BehaviorSubject(null);
  public userUid$ = this.privateUserUid$.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private messageService: MessageService
  ) {
    this.afAuth.authState
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((auth) => {
          if (auth) {
            console.log(`signin' in`);
            this.userUid = auth.uid;
            this.privateUserUid$.next(auth.uid);
            return this.db.object('users/' + auth.uid).valueChanges();
          } else {
            /// not signed in
            console.log('not signed in');
            this.userUid = null;
            return of(null);
          }
        }),
      )
      .subscribe((user) => {
        this.user.next(user);
      });
  }

  public getUserUid() {
    return this.userUid;
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(
      (credential) => {
        this.updateNewUser(credential.user);
      },
      (error) => {
        console.log('auth service googleLogin error');
        throw error;
      }
    );
  }

  public emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        (user) => {
          this.updateNewUser(user);
        },
        (error) => {
          console.log('auth service emailSignUp error');
          throw error;
        }
      );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (user) => {
        this.updateNewUser(user);
      },
      (error) => {
        console.log('auth service emailLogin error');
        throw error;
      }
    );
  }

  public signOut() {
    this.afAuth.auth.signOut();
    this.messageService.add('You have been logged out.');
  }

  public updateProfile(userData: User) {
    this.updateExistingUser(userData);
    this.messageService.add('User profile has been updated!');
  }

  public updatePassword(password: string) {
    return this.afAuth.auth.currentUser
      .updatePassword(password)
      .then(() => {
        this.messageService.add('Password has been updated!');
      })
      .catch(function(error) {
        console.log('auth service updatePassword error');
        throw error;
      });
  }

  public updateEmail(email: string) {
    return this.afAuth.auth.currentUser
      .updateEmail(email)
      .then(() => {
        this.updateExistingUser({ email: email });
        this.messageService.add('User email have been updated!');
      })
      .catch(function(error) {
        console.log('auth service updateEmail error');
        throw error;
      });
  }

  private updateNewUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object('users/' + authData.uid);
    ref
      .valueChanges()
      .pipe(
        takeUntil(this.unsubscribe$),
        take(1)
      )
      .subscribe((user) => {
        if (!user) {
          ref.update(userData);
        }
      });
  }

  private updateExistingUser(userData) {
    const currentUser = this.afAuth.auth.currentUser;
    const ref = this.db.object('users/' + currentUser.uid);
    ref
      .valueChanges()
      .pipe(
        takeUntil(this.unsubscribe$),
        take(1)
      )
      .subscribe((user) => {
        ref.update(userData);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
