/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  queryCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.queryCollection = this.afs.collection('queries');
  }

  getQueries(): Observable<any[]> {
    const queries$ = this.queryCollection.valueChanges();
    return queries$
      .pipe
      // tap(data => console.log('Queries', data))
      ();
  }

  getNewId() {
    return this.afs.createId();
  }

  addNewQuery(query) {
    query.id = this.afs.createId();
    query.date_time = new Date().getTime();
    query.timestamp = new Date().getTime();

    return this.updateQuery(query);
  }

  updateQuery(query) {
    // console.log(query);
    return this.queryCollection
      .doc(query.id)
      .set(query)
      .then(() => Promise.resolve(query));
  }

  deleteQuery(query) {
    return this.queryCollection
      .doc(query.id)
      .delete()
      .then(() => Promise.resolve(query));
  }

  getQuery(id): Observable<any> {
    const query$ = this.afs.doc(`queries/${id}`).valueChanges();
    return query$
      .pipe
      // tap(data => console.log('Query', data))
      ();
  }

  getCurrentUserQueries() {
    return this.userService.getCurrentUser().pipe(
      switchMap((user: any) => {
        if (user) {
          return this.getUserQueries(user.id);
        } else {
          return of([]);
        }
      })
    );
  }

  getUserQueries(user_id: string): Observable<any> {
    return this.afs
      .collection('queries', (ref) => ref.where('user_id', '==', user_id))
      .valueChanges();
  }
}
