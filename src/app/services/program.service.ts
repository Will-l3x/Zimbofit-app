/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { ImageService } from './image.service';
import { SettingsService } from './settings.service';
import { UserService } from './user.service';
import { PurchasesService } from './purchases.service';

@Injectable({
    providedIn: 'root'
})
export class ProgramService {
    programCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore,
        private imageService: ImageService,
        private settingsService: SettingsService,
        private userService: UserService,
        private purchasesService: PurchasesService,
        private http: HttpClient) {
        this.programCollection = this.afs.collection('programs', ref => ref.orderBy('name', 'asc'));
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/program.json');
    }

    getPrograms(): Observable<any[]> {
        const myCategories$ = this.settingsService.categories;
        const programs$ = this.programCollection.valueChanges();
        const workouts$: Observable<any[]> = this.afs.collection('workouts', ref => ref.orderBy('name', 'asc')).valueChanges();
        const categories$: Observable<any[]> = this.afs.collection('categories', ref => ref.orderBy('name', 'asc')).valueChanges();
        const purchases$ = this.purchasesService.getPurchases();
        return combineLatest([
            programs$,
            workouts$,
            categories$,
            myCategories$,
            purchases$
        ]).pipe(
            map(([programs, workouts, categories, myCategories, purchases]) => programs.filter(p => myCategories.filter(m => m.isChecked).find(cat => cat.id === p.category_id)).map(program => {
                    if (program.workouts) {
                        program.wrks = program.workouts.map(wrk => workouts.find(workout => workout.id === wrk.workout_id));
                    }

                    if (program.category_id) {
                        program.category = categories.find(cat => cat.id === program.category_id);
                    }

                    if (purchases && purchases.length) {
                        const purchase = purchases.find(p => p.item_id === program.id);
                        if (purchase) { program.purchased = true; }
                    }

                    return program;
                })),
            tap(data => console.log('Programs', data))
        );
    }

    getNewId() {
        return this.afs.createId();
    }

    addNewProgram(program) {
        program.id = this.afs.createId();
        program.date_time = (new Date()).getTime();
        program.timestamp = (new Date()).getTime();

        return this.updateProgram(program);
    }

    updateProgram(program) {
        // console.log(program);
        return this.programCollection.doc(program.id).set(program).then(() => Promise.resolve(program));
    }

    deleteProgram(program) {
        return this.programCollection.doc(program.id).delete().then(() => Promise.resolve(program));
    }

    getProgram(id): Observable<any> {
        const program$: Observable<any> = this.afs.doc(`programs/${id}`).valueChanges();
        const authoredProgram$: Observable<any> = this.afs.doc(`user-authored-programs/${id}`).valueChanges();

        const workouts$: Observable<any[]> = combineLatest([
            this.afs.collection('workouts', ref => ref.orderBy('name', 'asc')).valueChanges(),
            this.afs.collection('user-authored-workouts', ref => ref.orderBy('name', 'asc')).valueChanges()
        ]).pipe(map(([workouts, myWorkouts]) => myWorkouts.concat(workouts)));
        const trainers$: Observable<any[]> = this.afs.collection('trainers', ref => ref.orderBy('name', 'asc')).valueChanges();
        const users$: Observable<any[]> = this.afs.collection('users', ref => ref.orderBy('name', 'asc')).valueChanges();
        const categories$: Observable<any[]> = this.afs.collection('categories', ref => ref.orderBy('name', 'asc')).valueChanges();
        const purchases$ = this.purchasesService.getPurchases();

        return combineLatest([
            program$,
            authoredProgram$,
            workouts$,
            trainers$,
            users$,
            categories$,
            purchases$
        ]).pipe(
            map(([program, authoredProgram, workouts, trainers, users, categories, purchases]) => {
                program = program ? program : authoredProgram;

                if (program.category_id) { program.category = categories.find(cat => cat.id === program.category_id); }

                if (program.workouts) {
                    program.wrks = program.workouts.map(wrk => workouts.find(workout => workout.id === wrk.workout_id));
                }

                if (program.trainer_id) {
                    program.trainer = trainers.find(t => t.id === program.trainer_id);
                } else { delete program.trainer; }
                if (program.user_id) { program.user = users.find(u => u.id === program.user_id); }

                if (purchases && purchases.length) {
                    const purchase = purchases.find(p => p.item_id === program.id);
                    // console.log(purchase);
                    if (purchase) { program.purchased = true; }
                }

                // program.price = Math.random()*100;

                return program;
            }),
            tap(data => {
                // console.log('Program', data);
            })
        );
    }
}
