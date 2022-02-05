import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.categoryCollection = this.afs.collection('categories', (ref) =>
      ref.orderBy('name', 'asc')
    );
  }

  getFields(): Observable<any> {
    return this.http.get('./assets/json/category.json');
  }

  getCategories(): Observable<any[]> {
    return this.categoryCollection.valueChanges().pipe(take(1));
  }

  addNewCategory(category) {
    category.id = this.afs.createId();
    category.date_time = new Date().getTime();
    category.timestamp = new Date().getTime();

    return this.updateCategory(category);
  }

  updateCategory(category) {
    console.log(category);
    return this.categoryCollection
      .doc(category.id)
      .set(category)
      .then(() => Promise.resolve(category));
  }

  deleteCategory(category) {
    return this.categoryCollection
      .doc(category.id)
      .delete()
      .then(() => Promise.resolve(category));
  }

  getCategory(id) {
    return this.afs
      .doc(`categories/${id}`)
      .valueChanges()
      .pipe
      // tap(data => console.log("Category", data))
      ();
  }
}
