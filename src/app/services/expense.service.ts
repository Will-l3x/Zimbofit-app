import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    expenseCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore, private http: HttpClient) {
        this.expenseCollection = this.afs.collection('expenses', ref => ref.orderBy('name', 'asc'));
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/expense.json');
    }

    getExpenses(): Observable<any[]> {
        return this.expenseCollection.valueChanges().pipe(
            // tap(data => console.log("Expenses", data))
        );
    }

    addNewExpense(expense) {
        expense.id = this.afs.createId();
        expense.date_time = (new Date()).getTime();
        expense.timestamp = (new Date()).getTime();

        return this.updateExpense(expense);
    }

    updateExpense(expense) {
        // console.log(expense);
        return this.expenseCollection.doc(expense.id).set(expense).then(() => Promise.resolve(expense));
    }

    deleteExpense(expense) {
        return this.expenseCollection.doc(expense.id).delete().then(() => Promise.resolve(expense));
    }

    getExpense(id) {
        return this.afs.doc(`expenses/${id}`).valueChanges().pipe(
            // tap(data => console.log("Expense", data))
        );
    }
}
