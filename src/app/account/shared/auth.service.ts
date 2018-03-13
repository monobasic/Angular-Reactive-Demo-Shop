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

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.afAuth.authState
            .switchMap(auth => {
                if (auth) {
                    /// signed in
                    return this.db.object('users/' + auth.uid).valueChanges();
                } else {
                    /// not signed in
                    return Observable.of(null);
                }
            })
            .subscribe(user => {
                this.user.next(user);
                console.log('authState changed, user is now: ');
                console.log(this.user.getValue());
            });
    }


    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider)
            .then(credential => {
                this.updateUser(credential.user);
            });
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.updateUser(user);
            })
            .catch(error => console.log(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.updateUser(user);
            })
            .catch(error => console.log(error));
    }

    signOut() {
        this.afAuth.auth.signOut();
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
