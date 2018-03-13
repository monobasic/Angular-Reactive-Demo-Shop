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

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private logger: MessageService
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
  //   this.logger.addError("Passwords don't match!")
  //   return pass === confirmPass ? null : { notSame: true };
  // }

  onRegister() {
    // console.log(this.registerForm);
    // this.registerForm.value.password = this.registerForm.value.passwords.password;
    this.authenticationService.emailSignUp(this.registerForm.value.email, this.registerForm.value.password)
    .then(
      (val) => {
        console.log(val);
        this.router.navigate(['/home']);
      },
      (error) => console.log(error)
    );
  }

  onLogin() {
    this.authenticationService
      .emailLogin(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        if (this.authenticationService.user) {
          this.logger.add(`Authentication successful`);
          this.router.navigate(['/home']);
        } else {
          this.logger.addError('Authentication failed');
          this.loginForm.setErrors({
            email: true,
            password: true
          });
        }

        }
      ).catch((error) => {
          console.log('error: ');
          console.log(error);
      });
  }
}
