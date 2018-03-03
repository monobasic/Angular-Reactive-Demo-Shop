import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
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
    private authenticationService: AuthenticationService,
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
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  onRegister() {
    this.authenticationService.register(this.registerForm.value)
      .subscribe((val) => {
        this.router.navigate(['/home']);
      }, (error) => console.log(error));
  }

  onLogin() {
    this.authenticationService.login(this.loginForm.value)
      .subscribe((response) => {
        if (response.success) {
          this.logger.add(`Authentication successful`);
          this.router.navigate(['/home']);
        } else {
          console.log(response);
          this.logger.addError('Authentication failed');

          this.loginForm.setErrors({
            'email': true,
            'password': true
          });
        }
      }, (error) => error.subscribe(res => console.log(res)));
    }
  }
