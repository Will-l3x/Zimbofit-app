import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    exerciseCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore,
        private settingsService: SettingsService,
        private http: HttpClient) {
        this.exerciseCollection = this.afs.collection('exercises', ref => ref.orderBy('name', 'asc'));
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/exercise.json');
    }

    getExercises(): Observable<any[]> {
        return this.exerciseCollection.valueChanges();
    }

    getExerciseTypes(): Observable<any> {
        return this.http.get('./assets/json/exercise-types.json');
    }

    getNewId() {
        return this.afs.createId();
    }

    addNewExercise(exercise) {
        exercise.id = this.afs.createId();
        exercise.date_time = (new Date()).getTime();
        exercise.timestamp = (new Date()).getTime();

        return this.updateExercise(exercise);
    }

    updateExercise(exercise) {
        // console.log(exercise);
        return this.exerciseCollection.doc(exercise.id).set(exercise).then(() => Promise.resolve(exercise));
    }

    deleteExercise(exercise) {
        return this.exerciseCollection.doc(exercise.id).delete().then(() => Promise.resolve(exercise));
    }

    getExercise(id): Observable<any> {
        return this.afs.doc(`exercises/${id}`).valueChanges().pipe(
            tap(data => {
                console.log('Exercise', data);
            })
        );
    }
}
