/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, groupBy, tap } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserWorkoutService {

    workoutCollection: AngularFirestoreCollection<any>;
    exerciseCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore,
        private http: HttpClient) {
        this.workoutCollection = this.afs.collection('user-authored-workouts', ref => ref.orderBy('name', 'asc'));
        this.exerciseCollection = this.afs.collection('exercises', ref => ref.orderBy('name', 'asc'));
    }

    public getFields(): Observable<any> {
        return this.http.get('./assets/json/workout.json');
    }

    getWorkouts(): Observable<any[]> {
        const workouts$ = this.workoutCollection.valueChanges();
        const exercises$ = this.exerciseCollection.valueChanges();

        return combineLatest([workouts$, exercises$]).pipe(
            map(([workouts, exercises]) => workouts.map(workout => {
                    const exs = groupBy(workout.exercises, (ex: any) => ex.exercise_id);
                    const exercises1 = [];
                    const deleted_exercises = [];
                    if (exs) {
                        for (const key in exs) {
                            if (key) {
                                const exercise = cloneDeep(exercises.find(exerc => exerc.id === key));
                                if (exercise) {
                                    exercise.sets = exs[key];
                                    this.setupMeasurements(exercise);
                                    exercise.totalSets = exercise.sets.length;
                                    exercises1.push(exercise);
                                } else {
                                    const del_ex: any = { id: key, sets: exs[key] };
                                    deleted_exercises.push(del_ex);
                                }
                            }
                        }
                    }
                    workout.ordered_exercises = exercises1;
                    workout.deleted_exercises = deleted_exercises;
                    return workout;
                }))
        );
    }

    getUserWorkouts(user_id): Observable<any[]> {
        const workouts$: Observable<any[]> = this.afs.collection('user-authored-workouts',
            ref => ref.where('user_id', '==', user_id)).valueChanges();
        const exercises$: Observable<any[]> = this.exerciseCollection.valueChanges();

        return combineLatest([workouts$, exercises$]).pipe(
            map(([workouts, exercises]) => workouts.map(workout => {
                    const exs = groupBy(workout.exercises, (ex: any) => ex.exercise_id);
                    const exercises1 = [];
                    const deleted_exercises = [];
                    if (exs) {
                        for (const key in exs) {
                            if (key) {
                                const exercise = cloneDeep(exercises.find(exerc => exerc.id === key));
                                if (exercise) {
                                    exercise.sets = exs[key];
                                    this.setupMeasurements(exercise);
                                    exercise.totalSets = exercise.sets.length;
                                    exercises1.push(exercise);
                                } else {
                                    const del_ex: any = { id: key, sets: exs[key] };
                                    deleted_exercises.push(del_ex);
                                }
                            }
                        }
                    }
                    workout.ordered_exercises = exercises1;
                    workout.deleted_exercises = deleted_exercises;
                    return workout;
                }))
        );
    }

    getNewId() {
        return this.afs.createId();
    }

    addNewWorkout(workout) {
        workout.id = this.afs.createId();
        workout.date_time = (new Date()).getTime();
        workout.timestamp = (new Date()).getTime();

        return this.updateWorkout(workout);
    }

    updateWorkout(workout) {
        // console.log(workout);
        return this.workoutCollection.doc(workout.id).set(workout).then(() => Promise.resolve(workout));
    }

    deleteWorkout(workout) {
        return this.workoutCollection.doc(workout.id).delete().then(() => Promise.resolve(workout));
    }

    getWorkout(id): Observable<any> {
        const workout$: Observable<any> = this.afs.doc(`user-authored-workouts/${id}`).valueChanges();
        const exercises$ = this.exerciseCollection.valueChanges();

        return combineLatest([workout$, exercises$]).pipe(
            map(([workout, exercises]) => {
                if (!workout) { return null; }
                const exs = groupBy(workout.exercises, (ex: any) => ex.exercise_id);
                const exercises1 = [];
                const deleted_exercises = [];
                if (exs) {
                    for (const key in exs) {
                        if (key) {
                            const exercise = cloneDeep(exercises.find(exerc => exerc.id === key));
                            if (exercise) {
                                exercise.sets = exs[key];
                                this.setupMeasurements(exercise);
                                exercise.totalSets = exercise.sets.length;
                                exercises1.push(exercise);
                            } else {
                                const del_ex: any = { id: key, sets: exs[key] };
                                deleted_exercises.push(del_ex);
                            }
                        }
                    }
                }
                workout.ordered_exercises = exercises1;
                workout.deleted_exercises = deleted_exercises;
                return workout;
            }),
            tap(data => {
                // console.log('Workout', data);
            })
        );
    }

    setupMeasurements(exercise) {
        if (exercise) {
            exercise.measurements = [];
            exercise.sets.map(set => {
                const time = {
                    name: 'time',
                    default: set.time ? set.time : 60,
                    unit: 'min'
                };
                const reps = {
                    name: 'reps',
                    default: set.reps ? set.reps : 20,
                    unit: ''
                };
                const weight = {
                    name: 'weight',
                    default: set.weight ? set.weight : 150,
                    unit: 'kg'
                };
                const distance = {
                    name: 'distance',
                    default: set.distance ? set.distance : 20,
                    unit: 'km'
                };

                const exerciseTime = exercise.measurements.find(measure => measure.name === 'time');
                const exerciseWeight = exercise.measurements.find(measure => measure.name === 'weight');
                const exerciseReps = exercise.measurements.find(measure => measure.name === 'reps');
                const exerciseDistance = exercise.measurements.find(measure => measure.name === 'distance');

                set.measurements = [];

                if (exercise.type === '1') { // Cardio
                    set.measurements.push({ ...time });
                    if (!exerciseTime) {
                        exercise.measurements.push({ ...time });
                    } else {
                        exerciseTime.default += time.default;
                    }
                } else if (exercise.type === '2') { // Strength
                    set.measurements.push({ ...reps });
                    if (!exerciseReps) {
                        exercise.measurements.push({ ...reps });
                    } else {
                        exerciseReps.default += reps.default;
                    }
                } else if (exercise.type === '3') { // Stretch
                    set.measurements.push({ ...time });
                    if (!exerciseTime) {
                        exercise.measurements.push({ ...time });
                    } else {
                        exerciseTime.default += time.default;
                    }
                } else if (exercise.type === '4') { // Balance
                    set.measurements.push({ ...time });
                    if (!exerciseTime) {
                        exercise.measurements.push({ ...time });
                    } else {
                        exerciseTime.default += time.default;
                    }
                } else if (exercise.type === '5') { // Weight Lifting
                    set.measurements.push({ ...reps });
                    set.measurements.push({ ...weight });

                    if (!exerciseReps) {
                        exercise.measurements.push({ ...reps });
                    } else {
                        exerciseReps.default += reps.default;
                    }

                    if (!exerciseWeight) {
                        exercise.measurements.push({ ...weight });
                    } else {
                        exerciseWeight.default += weight.default;
                    }
                } else if (exercise.type === '6') { // Distance
                    set.measurements.push({ ...distance });

                    if (!exerciseDistance) {
                        exercise.measurements.push({ ...distance });
                    } else {
                        exerciseDistance.default += distance.default;
                    }

                    set.measurements.push({ ...time });
                    if (!exerciseTime) {
                        exercise.measurements.push({ ...time });
                    } else {
                        exerciseTime.default += time.default;
                    }
                }
                set.primaryMeasurement = set.measurements[0];

                return set;
            });
            exercise.totalSets = exercise.sets.length;
        }
    }
}
