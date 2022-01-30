/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  workoutCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.workoutCollection = this.afs.collection('workouts', (ref) =>
      ref.orderBy('name', 'asc')
    );
  }

  public getFields(): Observable<any> {
    return this.http.get('./assets/json/workout.json');
  }

  getWorkouts(): Observable<any[]> {
    return this.workoutCollection.valueChanges();
  }

  getNewId() {
    return this.afs.createId();
  }

  addNewWorkout(workout) {
    workout.id = this.afs.createId();
    workout.date_time = new Date().getTime();
    workout.timestamp = new Date().getTime();

    return this.updateWorkout(workout);
  }

  updateWorkout(workout) {
    // console.log(workout);
    return this.workoutCollection
      .doc(workout.id)
      .set(workout)
      .then(() => Promise.resolve(workout));
  }

  deleteWorkout(workout) {
    return this.workoutCollection
      .doc(workout.id)
      .delete()
      .then(() => Promise.resolve(workout));
  }

  getWorkout(id): Observable<any> {
    return this.afs.doc(`workouts/${id}`).valueChanges();
  }
}
