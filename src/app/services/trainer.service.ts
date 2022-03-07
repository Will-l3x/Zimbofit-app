import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TrainerService {
    trainerCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore,
        private http: HttpClient) {
        this.trainerCollection = this.afs.collection('trainers', ref => ref.orderBy('name', 'asc'));
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/trainer.json');
    }

    getTrainers(): Observable<any[]> {
        return this.trainerCollection.valueChanges().pipe(take(1));
    }

    getNewId() {
        return this.afs.createId();
    }

    addNewTrainer(trainer) {
        trainer.id = this.afs.createId();
        trainer.date_time = (new Date()).getTime();
        trainer.timestamp = (new Date()).getTime();

        return this.updateTrainer(trainer);
    }

    updateTrainer(trainer) {
        // console.log(trainer);
        return this.trainerCollection.doc(trainer.id).set(trainer).then(() => Promise.resolve(trainer));
    }

    deleteTrainer(trainer) {
        return this.trainerCollection.doc(trainer.id).delete().then(() => Promise.resolve(trainer));
    }

    getTrainer(id): Observable<any> {
        return this.afs.doc(`trainers/${id}`).valueChanges().pipe(
            tap(data => {
                // console.log('Trainer', data);
            })
        );
    }
}
