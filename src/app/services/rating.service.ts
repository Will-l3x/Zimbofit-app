/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  ratingCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.ratingCollection = this.afs.collection('ratings', ref => ref.orderBy('name', 'asc'));
  }

  getFields(): Observable<any> {
    return this.http.get('./assets/json/rating.json');
  }

  getRatings(): Observable<any[]> {
    return this.ratingCollection.valueChanges().pipe(
      tap(data => console.log('Ratings', data))
    );
  }

  getNewId() {
    return this.afs.createId();
  }

  updateRating(rating) {
    // console.log(rating);
    return this.ratingCollection.doc(rating.id).set(rating).then(() => Promise.resolve(rating));
  }

  deleteRating(rating) {
    return this.ratingCollection.doc(rating.id).delete().then(() => Promise.resolve(rating));
  }

  getRating(id): Observable<any> {
    return this.afs.doc(`ratings/${id}`).valueChanges().pipe(
      tap(data => console.log('Rating', data))
    );
  }

  getRatingsOn(targetid): Observable<any[]> {
    return this.afs.collection('ratings', ref => ref.where('target_id', '==', targetid)).valueChanges();
  }

  getUserRatingOn(user_id, target_id): Observable<any> {
    return this.afs.collection('ratings', ref => ref.where('target_id', '==', target_id)
      .where('user_id', '==', user_id)).valueChanges().pipe(
        map(ratings => {
          if (ratings.length) { return ratings[0]; }
          return null;
        })
      );
  }
}
