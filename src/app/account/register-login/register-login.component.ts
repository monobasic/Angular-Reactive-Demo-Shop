import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../shared/user.service';
import { MessageService } from '../../messages/message.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private authenticationService: UserService,
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

    this.authenticationService.register(this.registerForm.value).subscribe(
      (val) => {
        this.router.navigate(['/home']);
      },
      (error) => console.log(error)
    );
  }

  onLogin() {
    this.authenticationService
      .login(this.loginForm.value)
      .subscribe((response) => {
        if (response.success) {
          this.logger.add(`Authentication successful`);
          this.router.navigate(['/home']);
        } else {
          console.log(response);
          this.logger.addError('Authentication failed');

          this.loginForm.setErrors({
            email: true,
            password: true
          });
        }
      });
  }
}
