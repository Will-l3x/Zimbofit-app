/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as moment from 'moment';
import { UserLocationService } from './user-location.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  viewCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private userLocationService: UserLocationService,
    private userService: UserService
  ) {
    this.viewCollection = this.afs.collection('views', ref =>
      ref.orderBy('name', 'asc')
    );
  }

  getViews(): Observable<any> {
    return this.userService.getCurrentUser().pipe(
      switchMap((user: any) => {
        if (user) {
          return this.getUserViews(user.id);
        }
        return of([]);
      })
    );
  }

  viewItem(item_name, item_id, item_type) {
    const timestamp = new Date().getTime();
    combineLatest([
      this.userService.getCurrentUser().pipe(take(1)),
      this.userLocationService.getUserLocation()
    ]).subscribe(([user, location]) => {
      let view = null;
      if (user) {
        view = {
          id: user.id + item_id + timestamp,
          user_id: user.id,
          item_id,
          item_type,
          item_name,
          date: moment().format('YYYY-MM-DD'),
          timestamp,
          user_gender: user.gender,
          user_dob: user.dob,
          user_name: user.name || user.full_name,
          ...location
        };
      } else {
        view = {
          id: item_id + timestamp,
          item_id,
          item_type,
          item_name,
          date: moment().format('YYYY-MM-DD'),
          timestamp,
          ...location
        };
      }

      this.viewCollection.doc(view.id).set(view);
    });
  }

  viewItems(item_type) {
    const timestamp = new Date().getTime();
    combineLatest([
      this.userService.getCurrentUser().pipe(take(1)),
      this.userLocationService.getUserLocation()
    ]).subscribe(([user, location]) => {
      let view = null;
      if (user) {
        view = {
          id: user.id + item_type + timestamp,
          user_id: user.id,
          item_type,
          date: moment().format('YYYY-MM-DD'),
          timestamp,
          user_name: user.name || user.full_name,
          user_gender: user.gender,
          user_dob: user.dob,
          ...location
        };
      } else {
        view = {
          id: item_type + timestamp,
          item_type,
          date: moment().format('YYYY-MM-DD'),
          timestamp,
          ...location
        };
      }

      this.viewCollection.doc(view.id).set(view);
    });
  }

  deleteView(view) {
    return this.viewCollection
      .doc(view.id)
      .delete()
      .then(() => Promise.resolve(view));
  }

  getView(id): Observable<any> {
    return this.afs
      .doc(`views/${id}`)
      .valueChanges()
      .pipe(
        // tap(data => console.log('View', data))
      );
  }

  getUserViews(userid): Observable<any[]> {
    return this.afs
      .collection('views', ref => ref.where('user_id', '==', userid))
      .valueChanges();
  }

  getUserViewOn(user_id, item_id): Observable<any> {
    return this.afs
      .collection('views', ref =>
        ref.where('item_id', '==', item_id).where('user_id', '==', user_id)
      )
      .valueChanges()
      .pipe(
        map(views => {
          if (views.length) {
            return views[0];
          }
          return null;
        })
      );
  }
}
