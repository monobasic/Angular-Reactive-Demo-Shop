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
  user: User;
  formProfile: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(
      user => this.user = user
    );
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formProfile = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required)
    });
  }

}
