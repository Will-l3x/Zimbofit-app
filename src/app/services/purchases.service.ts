/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  public url = 'https://zimfit-express.herokuapp.com/payment';
  public ecocashUrl = 'https://zimfit-express.herokuapp.com/payment/ecocash';
  public onemoneyUrl = 'https://zimfit-express.herokuapp.com/payment/onemoney';
  public cardUrl = 'https://zimfit-express.herokuapp.com/payment/card';
  public cash = 'https://zimfit-express.herokuapp.com/payment/cash';
  public paypalUrl = 'https://zimfit-express.herokuapp.com/payment/paypal';

  purchaseCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private userService: UserService
  ) { }

  getPurchases(): Observable<any> {
    return this.userService.getCurrentUser().pipe(
      switchMap((user: any) => {
        if (user) {
          return this.getUserPurchases(user.id);
        }
        return of([]);
      })
    );
  }

  getNewId() {
    return this.afs.createId();
  }

  initiateEcocashPurchases(invoice: Invoice, phone = '') {
    return this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((user) => {
        // console.log(invoice);

        this.http
          .post(this.ecocashUrl, {
            items: invoice.items,
            invoiceId: invoice.id,
            email: user.email || 'k1muza@gmail.com',
            phone: phone || user.phone,
          })
          .subscribe((resp) => {
            // console.log(resp);
          });
      });
  }

  initiateOnemoneyPurchases(invoice: Invoice, phone = '') {
    return this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((user) => {
        // console.log(invoice);

        this.http
          .post(this.onemoneyUrl, {
            items: invoice.items,
            invoiceId: invoice.id,
            email: user.email || 'k1muza@gmail.com',
            phone: phone || user.phone,
          })
          .subscribe((resp) => {
            // console.log(resp);
          });
      });
  }

  async initiatePaypalPurchases(invoice: Invoice): Promise<string> {
    const user = await this.userService
      .getCurrentUser()
      .pipe(take(1))
      .toPromise();
    if (user) {
      // console.log(user);
      const links = (await this.http
        .post(this.paypalUrl, {
          items: invoice.items,
          invoiceId: invoice.id,
          email: user.email || 'k1muza@gmail.com',
        })
        .toPromise()) as string;
      // console.log(links);
      return links;
    } else {
      return null;
    }
  }

  deletePurchase(purchase) {
    return this.afs
      .collection('purchases')
      .doc(purchase.id)
      .delete()
      .then(() => Promise.resolve(purchase));
  }

  getPurchase(id): Observable<any> {
    return this.afs
      .doc(`purchases/${id}`)
      .valueChanges();
    // .pipe(tap((data) => console.log("Purchase", data))); // 0773408071
  }

  getUserPurchases(userid): Observable<any[]> {
    return this.afs
      .collection('purchases', (ref) => ref.where('user_id', '==', userid))
      .valueChanges();
  }

  getUserPurchaseOn(user_id, item_id): Observable<any> {
    return this.afs
      .collection('purchases', (ref) =>
        ref.where('item_id', '==', item_id).where('user_id', '==', user_id)
      )
      .valueChanges()
      .pipe(
        map((purchases) => {
          if (purchases.length) {
            return purchases[0];
          }
          return null;
        })
      );
  }
}
