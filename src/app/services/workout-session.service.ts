/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import orderBy from 'lodash-es/orderBy';
import { UserService } from './user.service';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {

  constructor(private afs: AngularFirestore,
    private userService: UserService,
    private http: HttpClient) {
  }

  getFields(): Observable<any> {
    return this.http.get('./assets/json/workout.json');
  }

  getWorkouts(): Observable<Session[]> {
    return this.userService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.getUserWorkouts(user.id);
        } else {
          return of([]);
        }
      })
    );
  }

  getUserWorkouts(user_id: string): Observable<Session[]> {
    return this.afs.collection('workout-sessions', ref => ref.where('user_id', '==', user_id)).valueChanges().pipe(
      map(data => orderBy(data, 'timestamp', 'desc'))
    );
  }

  getWorkoutSessions(workout_id: string): Observable<Session[]> {
    return this.afs.collection('workout-sessions', ref => ref.where('workout_id', '==', workout_id)).valueChanges().pipe(
      map(data => orderBy(data, 'timestamp', 'desc'))
    );
  }

  getNewId() {
    return this.afs.createId();
  }

  addNewWorkout(workout) {
    workout.id = this.afs.createId();
    workout.timestamp = (new Date()).getTime();

    return this.updateWorkout(workout);
  }

  updateWorkout(workout) {
    // console.log(workout);
    return this.afs.collection('workout-sessions').doc(workout.id).set(workout).then(() => Promise.resolve(workout));
  }

  deleteWorkout(workout) {
    return this.afs.collection('workout-sessions').doc(workout.id).delete().then(() => Promise.resolve(workout));
  }

  getWorkout(id): Observable<Session> {
    return (this.afs.doc(`workout-sessions/${id}`).valueChanges() as Observable<Session>).pipe(
      tap(data => {
        // console.log('Workout', data);
      })
    );
  }
}
