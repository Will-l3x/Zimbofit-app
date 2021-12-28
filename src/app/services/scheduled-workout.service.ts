/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduledWorkoutService {

  workoutCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore,
    private http: HttpClient) {
    this.workoutCollection = this.afs.collection('scheduled-workouts', ref => ref.orderBy('name', 'asc'));
  }

  getNewId() {
    return this.afs.createId();
  }

  updateWorkout(workout) {
    // console.log(workout);
    return this.workoutCollection.doc(workout.id).set(workout).then(() => Promise.resolve(workout));
  }

  deleteWorkout(workout) {
    return this.workoutCollection.doc(workout.id).delete().then(() => Promise.resolve(workout));
  }

  getWorkout(id): Observable<any> {
    return this.afs.doc(`scheduled-workouts/${id}`).valueChanges().pipe(
      // tap(data => console.log('Workout', data))
    );
  }

  getUserWorkouts(user_id): Observable<any> {
    return this.afs.collection('scheduled-workouts', ref => ref.where('user_id', '==', user_id)).valueChanges();
  }
}
