import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserProgramService {

    programCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore,
        private http: HttpClient) {
        this.programCollection = this.afs.collection('user-authored-programs', ref => ref.orderBy('name', 'asc'));
    }

    getFields(): Observable<any> {
        return this.http.get('./assets/json/program.json');
    }

    getPrograms(): Observable<any[]> {
        return this.programCollection.valueChanges().pipe(
            // tap(data => console.log('Programs', data))
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
        return this.afs.doc(`user-authored-programs/${id}`).valueChanges().pipe(
            tap(data => {
                // console.log('Program', data);
            })
        );
    }
}
