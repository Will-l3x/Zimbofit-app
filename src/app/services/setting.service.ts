import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.afs.collection('settings', ref => ref.orderBy('name', 'asc'));
  }

  getFields(): Observable<any> {
    return this.http.get('./assets/json/settings.json');
  }

  getSettings(): Observable<any[]> {
    return this.afs.collection('settings').valueChanges().pipe(
      // tap(data => console.log("Settings", data))
    );
  }

  getNewId() {
    return this.afs.createId();
  }

  addNewSetting(setting) {
    setting.id = setting.name;
    setting.timestamp = (new Date()).getTime();

    return this.updateSetting(setting);
  }

  updateSetting(setting) {
    // console.log(setting);
    return this.afs.collection('settings').doc(setting.id).set(setting).then(() => Promise.resolve(setting));
  }

  deleteSetting(setting) {
    return this.afs.collection('settings').doc(setting.id).delete().then(() => Promise.resolve(setting));
  }

  getSetting(id) {
    return this.afs.doc(`settings/${id}`).valueChanges().pipe(
      // tap(data => console.log("Setting", data))
    );
  }
}
