import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  offline: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  isOffline(): Observable<boolean> {
    return this.offline;
  }

  isOnline(): Observable<boolean> {
    return this.offline.pipe(
      map(offline => !offline)
    );
  }

  setOffline() {
    this.offline.next(true);
  }

  setOnline() {
    this.offline.next(false);
  }

  setStatus(status) {
    this.offline.next(status);
  }
}
