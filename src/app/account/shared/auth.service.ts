import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User, Roles } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthService {

    user: BehaviorSubject<User> = new BehaviorSubject(null);
    private userUid: string;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.afAuth.authState
            .switchMap(auth => {
                if (auth) {
                    /// signed in
                    this.userUid = auth.uid;
                    return this.db.object('users/' + auth.uid).valueChanges();
                } else {
                    /// not signed in
                    this.userUid = null;
                    return Observable.of(null);
                }
            })
            .subscribe(user => {
                this.user.next(user);
                console.log('authState changed, user is now: ');
                console.log(this.user.getValue());
                console.log(this.userUid);
            });
    }

    getUserUid() {
        return this.userUid;
    }


    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider)
            .then(
                credential => {
                    console.log('update user!');
                    this.updateUser(credential.user);
                },
                error => {
                    console.log('auth service googleLogin error');
                    throw error;
                }
            );
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(
                    user => {
                        console.log('update user!');
                        this.updateUser(user);
                    },
                    error => {
                        console.log('auth service emailSignUp error');
                        throw error;
                }
            );
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
                user => {
                    console.log('update user!');
                    this.updateUser(user);
                },
                error => {
                    console.log('auth service emailLogin error');
                    throw error;
                }
            );
    }

    signOut() {
        this.afAuth.auth.signOut();
    }

    updateProfile(userData: {}) {
        const user = this.afAuth.auth.currentUser;

        // user.updateEmail("user@example.com").then(function () {
        //     // Update successful.
        // }).catch(function (error) {
        //     // An error happened.
        // });

        // user.updatePassword(newPassword).then(function () {
        //     // Update successful.
        // }).catch(function (error) {
        //     // An error happened.
        // });
    }

    /// Updates database with user info after login (for first time login only)
    private updateUser(authData) {
        const userData = new User(authData);
        const ref = this.db.object('users/' + authData.uid);
        ref.valueChanges().take(1)
            .subscribe(user => {
                if (!user) {
                    ref.update(userData);
                }
            });
    }
}
