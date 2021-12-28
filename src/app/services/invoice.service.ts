import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Invoice } from '../interfaces/invoice';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private afs: AngularFirestore, private http: HttpClient) {
    }

    getInvoices(): Observable<any[]> {
        return this.afs.collection('invoices').valueChanges().pipe(
            // tap(data => console.log('Invoices', data))
        );
    }

    addNewInvoice(invoice: Invoice) {
        invoice.id = this.afs.createId();
        invoice.timestamp = (new Date()).getTime();

        return this.updateInvoice(invoice);
    }

    getNewId(): string {
        return this.afs.createId();
    }

    async updateInvoice(invoice: Invoice) {
        // console.log(invoice);
        const res = await this.afs.collection('invoices').doc(invoice.id).set(invoice);
        // console.log(res);
        return invoice;
    }

    deleteInvoice(invoice: Invoice) {
        return this.afs.collection('invoices').doc(invoice.id).delete().then(() => Promise.resolve(invoice));
    }

    getInvoice(id): Observable<Invoice> {
        return this.afs.doc(`invoices/${id}`).valueChanges().pipe(
            tap(data => console.log('Invoice', data))
        ) as Observable<Invoice>;
    }
}
