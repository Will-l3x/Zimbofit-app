/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    private userLogin = new Subject(),
    private userSignup = new Subject(),
    private userLogout = new Subject(),
    public userLogin$ = userLogin.asObservable(),
    public userSignup$ = userSignup.asObservable(),
    public userLogout$ = userLogout.asObservable(),
    public storage: Storage
  ) {}
  publishUserLogin() {
    this.userLogin.next('user:login');
  }
  publishUserLogout() {
    this.userLogout.next('user:logout');
  }
  publishUserSignup() {
    this.userSignup.next('user:signup');
  }

  hasFavorite(sessionName: string): boolean {
    return this._favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(phone: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setPhone(phone);
      return this.publishUserLogin();
    });
  }

  signup(phone: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setPhone(phone);
      return this.publishUserSignup();
    });
  }

  logout(): Promise<any> {
    return this.storage
      .remove(this.HAS_LOGGED_IN)
      .then(() => this.storage.remove('phone'))
      .then(() => {
        this.publishUserLogout();
      });
  }

  setPhone(phone: string): Promise<any> {
    return this.storage.set('phone', phone);
  }

  getPhone(): Promise<string> {
    return this.storage.get('phone').then((value) => value);
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => value === true);
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => value);
  }
}
