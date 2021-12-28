import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private afs: AngularFirestore, private http: HttpClient) {
    }

    getPayments(): Observable<any[]> {
        return this.afs.collection('payments').valueChanges().pipe(
            // tap(data => console.log('Payments', data))
        );
    }

    addNewPayment(payment) {
        payment.id = this.afs.createId();
        payment.date_time = (new Date()).getTime();
        payment.timestamp = (new Date()).getTime();

        return this.updatePayment(payment);
    }

    updatePayment(payment) {
        // console.log(payment);
        return this.afs.collection('payments').doc(payment.id).set(payment).then(() => Promise.resolve(payment));
    }

    deletePayment(payment) {
        return this.afs.collection('payments').doc(payment.id).delete().then(() => Promise.resolve(payment));
    }

    getPayment(id) {
        return this.afs.doc(`payments/${id}`).valueChanges().pipe(
            // tap(data => console.log('Payment', data))
        );
    }
}
