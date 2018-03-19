import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerErrors: string;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initLoginForm();
    this.initRegisterForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      // firstName: new FormControl(null, Validators.required),
      // lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
      // phoneNumber: new FormControl(null),
      // passwords: new FormGroup({
      //   password: new FormControl(null, Validators.required),
      //   confirmPassword: new FormControl(null, Validators.required)
      // }, this.checkPasswords)
    });
  }

  // checkPasswords() {
  //   console.log(this.registerForm);
  //   const pass = this.registerForm.value.passwords.password;
  //   const confirmPass = this.registerForm.value.passwords.confirmPassword;
  //   this.messageService.addError("Passwords don't match!")
  //   return pass === confirmPass ? null : { notSame: true };
  // }

  onRegister() {
    // this.registerForm.value.password = this.registerForm.value.passwords.password;
    this.authenticationService.emailSignUp(this.registerForm.value.email, this.registerForm.value.password)
    .then(
      () => {
        this.messageService.add('Registration successful!');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('onRegister() error: ');
        console.log(error);
        this.registerErrors = error.message;
        if (error.code === 'auth/weak-password') {
          this.registerForm.controls.password.setErrors({ password: true });
          this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
        }
        if (error.code === 'auth/email-already-in-use') {
          this.registerForm.controls.email.setErrors({ email: true });
        }
      }
    );
  }

  onLogin() {
    console.log('onLogin called');
    this.authenticationService
      .emailLogin(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        () => {
          this.messageService.add('Login successful!');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log('onLogin() error: ');
          console.log(error.code);
          console.log(error.message);
          if (error.code === 'auth/user-not-found') {
            this.loginForm.controls.email.setErrors({ email: true });
          }
          if (error.code === 'auth/wrong-password') {
            this.loginForm.controls.password.setErrors({ password: true });
          }
        }
      );

    console.log(this.loginForm);
  }
}
