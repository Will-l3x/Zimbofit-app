import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class SetService {

    setCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore) {
        this.setCollection = this.afs.collection('sets', ref => ref.orderBy('name', 'asc'));
    }

    getSets(): Observable<any[]> {
        return this.setCollection.valueChanges().pipe(
            // tap(data => console.log("Sets", data))
        );
    }

    addNewSet(set) {
        set.id = this.afs.createId();
        set.date_time = (new Date()).getTime();
        set.timestamp = (new Date()).getTime();

        return this.updateSet(set);
    }

    updateSet(set) {
        // console.log(set);
        return this.setCollection.doc(set.id).set(set).then(() => Promise.resolve(set));
    }

    deleteSet(set) {
        return this.setCollection.doc(set.id).delete().then(() => Promise.resolve(set));
    }

    getSet(id) {
        return this.afs.doc(`sets/${id}`).valueChanges().pipe(
            // tap(data => console.log("Set", data))
        );
    }
}
