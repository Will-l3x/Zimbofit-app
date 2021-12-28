import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, map, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { of, Observable } from 'rxjs';
import { UserService } from './user.service';

export interface User {
  id: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  constructor(
    private userService: UserService,
    private db: AngularFireDatabase
  ) {
    // console.log('let there be presence');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
  }

  getPresence(phone: string): Observable<any> {
    return this.db
      .object(`status/${phone}`)
      .valueChanges()
      .pipe(map((presence: any) => presence && presence.status));
  }

  getCurrentUserPresence(): Observable<any> {
    return this.userService
      .getCurrentUser()
      .pipe(first())
      .pipe(
        switchMap((user: User) =>
          user ? this.getPresence(user.phone) : of('offline')
        )
      );
  }

  getUser() {
    return this.userService.getCurrentUser().pipe(first()).toPromise();
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`status/${user.phone}`).update({
        status,
        phone: user.phone,
        timestamp: this.timestamp,
      });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // Updates status when logged-in connection to Firebase starts
  updateOnUser() {
    const connection = this.db
      .object('.info/connected')
      .valueChanges()
      .pipe(map((connected) => (connected ? 'online' : 'offline')));

    return this.userService.getCurrentUser().pipe(
      switchMap((user) => (user ? connection : of('offline'))),
      tap((status: string) => this.setPresence(status))
    );
  }

  updateOnDisconnect() {
    return this.userService.getCurrentUser().pipe(
      tap((user: User) => {
        if (user) {
          this.db
            .object(`status/${user.phone}`)
            .query.ref.onDisconnect()
            .update({
              status: 'offline',
              phone: user.phone,
              timestamp: this.timestamp,
            });
        }
      })
    );
  }

  async signOut() {
    await this.setPresence('offline');
  }

  // User navigates to a new tab, case 3
  // updateOnAway() {
  //   document.onvisibilitychange = (e) => {

  //     if (document.visibilityState === 'hidden') {
  //       this.setPresence('away');
  //     } else {
  //       this.setPresence('online');
  //     }
  //   };
  // }
}
