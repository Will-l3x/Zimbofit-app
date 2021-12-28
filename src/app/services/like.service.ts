/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  likeCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore,
    private http: HttpClient) {
    this.likeCollection = this.afs.collection('likes', ref => ref.orderBy('name', 'asc'));
  }

  getFields(): Observable<any> {
    return this.http.get('./assets/json/like.json');
  }

  getLikes(): Observable<any[]> {
    return this.likeCollection.valueChanges().pipe(
      tap(data => console.log('Likes', data))
    );
  }

  getNewId() {
    return this.afs.createId();
  }

  updateLike(like) {
    // console.log(like);
    return this.likeCollection.doc(like.id).set(like).then(() => Promise.resolve(like));
  }

  deleteLike(like) {
    return this.likeCollection.doc(like.id).delete().then(() => Promise.resolve(like));
  }

  getLike(id): Observable<any> {
    return this.afs.doc(`likes/${id}`).valueChanges().pipe(
      tap(data => console.log('Like', data))
    );
  }

  getLikesOn(targetid): Observable<any[]> {
    return this.afs.collection('likes', ref => ref.where('target_id', '==', targetid)).valueChanges();
  }

  getUserLikeOn(user_id, target_id): Observable<any> {
    return this.afs.collection('likes', ref => ref.where('target_id', '==', target_id)
      .where('user_id', '==', user_id)).valueChanges().pipe(
        map(users => {
          if (users) { return users[0]; }
          return null;
        })
      );
  }

  getUserLikes(user_id): Observable<any> {
    return this.afs.collection('likes', ref => ref.where('user_id', '==', user_id)).valueChanges();
  }
}
