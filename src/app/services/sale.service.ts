import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    saleCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore, private http: HttpClient) {
        this.saleCollection = this.afs.collection('sales');
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/sale.json');
    }

    getSales(): Observable<any[]> {
        return this.saleCollection.valueChanges().pipe(
            // tap(data => console.log("Sales", data))
        );
    }

    addNewSale(sale) {
        sale.id = this.afs.createId();
        sale.date_time = (new Date()).getTime();
        sale.timestamp = (new Date()).getTime();

        return this.updateSale(sale);
    }

    updateSale(sale) {
        // console.log(sale);
        return this.saleCollection.doc(sale.id).set(sale).then(() => Promise.resolve(sale));
    }

    deleteSale(sale) {
        return this.saleCollection.doc(sale.id).delete().then(() => Promise.resolve(sale));
    }

    getSale(id) {
        return this.afs.doc(`sales/${id}`).valueChanges().pipe(
            // tap(data => console.log("Sale", data))
        );
    }
}
