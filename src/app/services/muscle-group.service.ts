import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MuscleGroupService {

    muscleGroupCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore, private http: HttpClient) {
        this.muscleGroupCollection = this.afs.collection('muscleGroups', ref => ref.orderBy('name', 'asc'));
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/muscle-group.json');
    }

    getMuscleGroups(): Observable<any[]> {
        return this.muscleGroupCollection.valueChanges().pipe(
            // tap(data => console.log("MuscleGroups", data))
        );
    }

    addNewMuscleGroup(muscleGroup) {
        muscleGroup.id = this.afs.createId();
        muscleGroup.date_time = (new Date()).getTime();
        muscleGroup.timestamp = (new Date()).getTime();

        return this.updateMuscleGroup(muscleGroup);
    }

    updateMuscleGroup(muscleGroup) {
        // console.log(muscleGroup);
        return this.muscleGroupCollection.doc(muscleGroup.id).set(muscleGroup).then(() => Promise.resolve(muscleGroup));
    }

    deleteMuscleGroup(muscleGroup) {
        return this.muscleGroupCollection.doc(muscleGroup.id).delete().then(() => Promise.resolve(muscleGroup));
    }

    getMuscleGroup(id) {
        return this.afs.doc(`muscleGroups/${id}`).valueChanges().pipe(
            tap(data => console.log('MuscleGroup', data))
        );
    }
}
