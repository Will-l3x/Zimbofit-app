/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';
import orderBy from 'lodash-es/orderBy';

import { UserService } from '../../services/user.service';
import { WindowService } from '../../services/window.service';
import { UserLocationService } from '../../services/user-location.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {
  windowRef: any;
  prefix = '+263';
  verificationCode: string;
  user: any;
  countries: any;
  userSub: Subscription;
  phonenumber;
  selectOptions = {
    header: 'Select your country',
  };

  form: FormGroup = new FormGroup({
    country: new FormControl('ZW'),
    phonenum: new FormControl(),
  });

  constructor(
    private win: WindowService,
    private http: HttpClient,
    private userLocationService: UserLocationService,
    public router: Router,
    public userService: UserService,
    public toastCtrl: ToastController
  ) {}

  get country() {
    return this.form.get('country');
  }
  get phonenum() {
    return this.form.get('phonenum');
  }
  phoneNum(num) {
    this.phonenumber = num;
  }
  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier =
      new firebase.default.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });

    this.windowRef.recaptchaVerifier.render().then((widgetId) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });

    this.http
      .get('assets/data/countries.json')
      .subscribe((data) => (this.countries = orderBy(data, 'name', 'desc')));

    this.country.valueChanges.subscribe((code) => {
      const country = this.countries.find((c) => c.code === code);
      this.prefix = country.dial_code;
    });
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.prefix + this.phonenum.value;

    firebase.default
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => {
        this.toastCtrl
          .create({
            header: error.code,
            message: error.message,
            color: 'danger',
            position: 'bottom',
            duration: 10000,
          })
          .then((toast) => toast.present());
      });
  }

  async verifyLoginCode() {
    const auth = await this.windowRef.confirmationResult.confirm(
      this.verificationCode
    );
    // console.log(auth);
    this.user = auth.user;
    await this.processUser(auth);
  }

  async processUser(auth) {
    const user = await this.userService
      .getCurrentUser()
      .pipe(take(1))
      .toPromise();
    // console.log(user);
    if (user && user.profile_complete) {
      this.userLocationService.updateUserlocation();
      this.router.navigateByUrl('/app/tabs/start');
    } else if (user) {
      this.router.navigateByUrl('/edit-profile');
      this.userLocationService.updateUserlocation();
    } else {
      await this.userService.updateUser({
        id: auth.user.phoneNumber,
        phone: auth.user.phoneNumber,
        email: auth.user.email || '',
        emailVerified: auth.user.emailVerified,
        photoURL: auth.user.photoURL,
        uid: auth.user.uid,
      });
      const toast = await this.toastCtrl.create({
        message: 'User signed up',
        position: 'bottom',
        duration: 3000,
      });
      toast.present();
      this.router.navigateByUrl('/edit-profile');
      this.userLocationService.updateUserlocation();
    }
  }

  hasError($event) {
    console.log($event);
  }
  getNumber($event) {
    console.log($event);
  }
  telInputObject($event) {
    console.log($event);
  }
  onCountryChange($event) {
    console.log($event);
  }
}
