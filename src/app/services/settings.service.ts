import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  myCategories$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  myMuscleGroups$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private afs: AngularFirestore, private storage: Storage) {
    this.initialize();
  }

  get muscles() {
    // return this.myMuscleGroups$;
    return combineLatest([
      this.storage.get('muscle-groups'),
      this.afs
        .collection('muscle-groups', (ref) => ref.orderBy('name', 'asc'))
        .valueChanges()
        .pipe(take(1))
        .toPromise(),
    ]).pipe(
      map(([storedCats, allCats]) => storedCats
          ? storedCats
          : allCats.map((cat: any) => {
              cat.isChecked = true;
              return cat;
            }))
    );
    // return this.storage.get('muscle-groups');
  }

  get categories() {
    // return this.myCategories$;
    return combineLatest([
      this.storage.get('categories'),
      this.afs
        .collection('categories', (ref) => ref.orderBy('name', 'asc'))
        .valueChanges()
        .pipe(take(1))
        .toPromise(),
    ]).pipe(
      map(([storedCats, allCats]) => storedCats
          ? storedCats
          : allCats.map((cat: any) => {
              cat.isChecked = true;
              return cat;
            }))
      // tap(data => console.log(data))
    );
    // return this.storage.get('categories');
  }

  async initialize() {
    await this.storage.create();
    let categories = await this.storage.get('categories');
    if (!categories || !categories.length) {
      categories = await this.afs
        .collection('categories', (ref) => ref.orderBy('name', 'asc'))
        .valueChanges()
        .pipe(take(1))
        .toPromise();
      await this.storage.set('categories', categories);
    }
    this.myCategories$.next(categories);

    let groups = await this.storage.get('muscle-groups');
    if (!groups || !groups.length) {
      groups = this.afs
        .collection('muscle-groups', (ref) => ref.orderBy('name', 'asc'))
        .valueChanges()
        .pipe(take(1))
        .toPromise();
      await this.storage.set('muscle-groups', groups);
    }
    this.myMuscleGroups$.next(groups);
  }

  async setMuscles(ms: any[]) {
    this.myMuscleGroups$.next(ms);
    await this.storage.set('muscle-groups', ms);
  }

  async setCategories(cats: any[]) {
    this.myCategories$.next(cats);
    await this.storage.set('categories', cats);
  }
}
