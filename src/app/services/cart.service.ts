/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { take, switchMap } from 'rxjs/operators';
import { PurchaseItem } from '../interfaces/purchase-item';

export interface User {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  categoryCollection: AngularFirestoreCollection<any>;

  constructor(
    private userService: UserService,
    private afs: AngularFirestore
  ) {}

  addItem(item: PurchaseItem) {
    this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((user: User) => {
        if (user) {
          this.afs
            .collection('users')
            .doc(user.id)
            .collection('cart')
            .doc(item.id)
            .set(item);
        } else {
          console.log('User not logged in');
        }
      });
  }

  getItems(): Observable<any> {
    return this.userService.getCurrentUser().pipe(
      switchMap((user: User) => {
        if (user) {
          return this.afs
            .collection('users')
            .doc(user.id)
            .collection('cart')
            .valueChanges();
        }
        return of([]);
      })
    );
  }

  emptyCart() {
    this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.afs
            .collection('users')
            .doc(user.id)
            .collection('cart')
            .valueChanges()
            .pipe(take(1))
            .subscribe((items) => {
              items.forEach((i) => {
                this.afs
                  .collection('users')
                  .doc(user.id)
                  .collection('cart')
                  .doc(i.id)
                  .delete();
              });
            }); // TODO delete collection elegantly;
        } else {
          console.log('User not logged in');
        }
      });
  }

  removeItem(item: PurchaseItem) {
    this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.afs
            .collection('users')
            .doc(user.id)
            .collection('cart')
            .doc(item.id)
            .delete();
        } else {
          console.log('User not logged in');
        }
      });
  }
}
