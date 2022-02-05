/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private afs: AngularFirestore, private userService: UserService) { }

  getRequests(): Observable<any[]> {
    return this.userService.getCurrentUser().pipe(
      switchMap((user: any) => this.afs.collection('requests', ref => ref.where('user_id', '==', user.id)).valueChanges()),
      // tap(data => console.log('Requests', data))
    );
  }

  updateRequest(request) {
    // console.log(request);
    return this.afs.collection('requests').doc(request.id).set(request).then(() => Promise.resolve(request));
  }

  deleteRequest(request) {
    return this.afs.collection('requests').doc(request.id).delete().then(() => Promise.resolve(request));
  }

  getRequest(item_id: string) {
    return this.userService.getCurrentUser().pipe(
      switchMap((user: any) => {
        console.log(item_id);
        console.log(user.id);
        return this.afs.collection('requests',
          ref => ref.where('user_id', '==', user.id).where('item_id', '==', item_id))
          .valueChanges();
      }),
      map(data => data.length ? data[0] : null),
      tap(data => console.log('Request', data))
    );
  }

  // getRequest(id: string) {
  //   return this.afs.doc(`requests/${id}`).valueChanges().pipe(
  //     // tap(data => console.log("Request", data))
  //   );
  // }
}
