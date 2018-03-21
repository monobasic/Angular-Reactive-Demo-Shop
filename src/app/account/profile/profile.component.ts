import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formProfile: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initFormGroup();
    this.authService.user.subscribe(
      user => {
        if (user) {
          this.formProfile.patchValue({
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email
          });
        }
      }
    );
  }

  private initFormGroup() {
    this.formProfile = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.email),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
    });
  }

}
