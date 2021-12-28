import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

import { UserService } from './user.service';
import { UserLocation } from '../interfaces/user-location';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {
  userLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject({
    country: {
      id: 'zw',
      name: 'Zimbabwe'
    },
    region: {
      id: 'zw_harare',
      name: 'Harare'
    },
    city: {
      id: 'zw_harare',
      name: 'Harare'
    },
    timezone: 'Africa/Harare'
  });

  userregionCollection: AngularFirestoreCollection<any>;

  iplocationUrl = 'http//ip-api.com/json';
  iplocationUrlSecure = 'https://ipinfo.io/';

  constructor(private afs: AngularFirestore,
    private http: HttpClient,
    private userService: UserService) {
    this.userregionCollection = this.afs.collection('user-regions');
  }

  getUserLocation(): Observable<UserLocation> {
    return this.userLocation$;
  }

  updateUserlocation(): void {
    this.http.get(this.iplocationUrl).subscribe((locationObject: any) => {
      const location: UserLocation = {
        country: {
          id: locationObject.countryCode.toLowerCase(),
          name: locationObject.country,
        },
        city: {
          id: (locationObject.countryCode + '_' + locationObject.city).replace(' ', '_').toLowerCase(),
          name: locationObject.city
        },
        region: {
          id: (locationObject.countryCode + '_' + locationObject.region).replace(' ', '_').toLowerCase(),
          name: locationObject.regionName
        },
        timezone: locationObject.timezone
      };

      this.userLocation$.next(location);
      this.userService.getCurrentUser().pipe(take(1)).subscribe(user => {
        if (user) {
          this.userService.updateUser({ ...user, ...location });
        }
      });
    });

  }
}
