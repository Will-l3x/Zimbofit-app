/* eslint-disable @angular-eslint/component-selector */
import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { UserService } from '../../services/user.service';
import { UserLocationService } from '../../services/user-location.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  user: UserOptions = { phone: '', username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public userService: UserService,
    private userLocationService: UserLocationService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.user.phone);
      this.userService.signup(this.user).then(() => this.userLocationService.updateUserlocation());
      this.router.navigateByUrl('/edit-profile');
    }
  }
}
