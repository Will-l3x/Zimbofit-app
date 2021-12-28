/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, take, finalize } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { LikeService } from './like.service';
import { RatingService } from './rating.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  CURRENT_USER = 'current_user';
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);

  userCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private storage: Storage,
    private likeService: LikeService,
    private ratingService: RatingService,
    private http: HttpClient,
    private userLogin = new Subject(),
    private userSignup = new Subject(),
    private userLogout = new Subject(),
    public userLogin$ = userLogin.asObservable(),
    public userSignup$ = userSignup.asObservable(),
    public userLogout$ = userLogout.asObservable()
  ) {
    this.userCollection = this.afs.collection('users', (ref) =>
      ref.orderBy('name', 'asc')
    );

    this.afAuth.authState
      .pipe(
        switchMap((auth) =>
          auth && auth.phoneNumber ? this.getUser(auth.phoneNumber) : of(null)
        )
      )
      .subscribe((user) => this.currentUser$.next(user));
  }

  publishUserLogin() {
    this.userLogin.next('user:login');
  }
  publishUserLogout() {
    this.userLogout.next('user:logout');
  }
  publishUserSignup() {
    this.userSignup.next('user:signup');
  }

  getLikeOn(id): Observable<any> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.likeService.getUserLikeOn(user.id, id);
        }
        return of(null);
      })
    );
  }

  getLikes(): Observable<any[]> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.likeService.getUserLikes(user.id);
        }
        return of([]);
      })
    );
  }

  getAuthoredWorkouts(): Observable<any[]> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserAuthoredWorkouts(user.id);
        }
        return of([]);
      })
    );
  }

  getAuthoredPrograms(): Observable<any[]> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserAuthoredPrograms(user.id);
        }
        return of([]);
      })
    );
  }

  deleteAuthoredProgram(program) {
    this.afs.collection('user-authored-programs').doc(program.id).delete();
  }

  getRatingOn(id): Observable<any> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        // console.log(user);
        if (user) {
          return this.ratingService.getUserRatingOn(user.id, id);
        }
        return of(null);
      })
      // tap(rating => console.log(rating))
    );
  }

  onLike(target_id, type, name) {
    this.getLikeOn(target_id)
      .pipe(take(1))
      .subscribe((like) => {
        if (like) {
          this.likeService.deleteLike(like);
        } else {
          this.currentUser$.pipe(take(1)).subscribe((user) => {
            if (user) {
              const newlike = {
                user_id: user.id,
                target_id,
                type,
                name,
                id: user.id + target_id,
                timestamp: new Date().getTime(),
              };
              this.likeService.updateLike(newlike);
            }
          });
        }
      });
  }

  onRating(target_id, type, name, rate) {
    this.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        const newRating = {
          user_id: user.id,
          target_id,
          type,
          name,
          rate,
          id: user.id + target_id,
          timestamp: new Date().getTime(),
        };
        this.ratingService.updateRating(newRating);
      }
    });
  }

  getUserAuthoredWorkouts(user_id): Observable<any[]> {
    return this.afs
      .collection('user-authored-workouts', (ref) =>
        ref.where('user_id', '==', user_id)
      )
      .valueChanges();
  }

  deleteAuthoredWorkout(workout) {
    // console.log(workout);
    this.afs.collection('user-authored-workouts').doc(workout.id).delete();
  }

  getUserAuthoredPrograms(user_id): Observable<any[]> {
    const program: Observable<any> = this.afs
      .collection('user-authored-programs', (ref) =>
        ref.where('user_id', '==', user_id)
      )
      .valueChanges();

    const workouts$: Observable<any[]> = combineLatest([
      this.afs
        .collection('workouts', (ref) => ref.orderBy('name', 'asc'))
        .valueChanges(),
      this.afs
        .collection('user-authored-workouts', (ref) =>
          ref.orderBy('name', 'asc')
        )
        .valueChanges(),
    ]).pipe(map(([workouts, myWorkouts]) => myWorkouts.concat(workouts)));

    const categories$: Observable<any[]> = this.afs
      .collection('categories', (ref) => ref.orderBy('name', 'asc'))
      .valueChanges();

    return combineLatest([program, workouts$, categories$]).pipe(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      map(([program, workouts, categories]) => {
        if (program.category_id) {
          program.category = categories.find(
            (cat) => cat.id === program.category_id
          );
        }

        if (program.workouts) {
          program.wrks = program.workouts.map((wrk) =>
            workouts.find((workout) => workout.id === wrk.workout_id)
          );
        }

        return program;
      })
    );
  }

  getCurrentUser = () =>
    this.afAuth.authState.pipe(
      switchMap((auth) =>
        auth && auth.phoneNumber ? this.getUser(auth.phoneNumber) : of(null)
      )
    );

  getNewId = () => this.afs.createId();

  getFields(): Observable<any> {
    return this.http.get('./assets/json/user.json');
  }

  getUsers(): Observable<any[]> {
    return this.userCollection
      .valueChanges()
      .pipe
      // tap(data => console.log('Users', data))
      ();
  }

  addNewUser(user) {
    user.id = this.afs.createId();
    user.date_time = new Date().getTime();
    user.timestamp = new Date().getTime();

    return this.updateUser(user);
  }

  async updateUser(user) {
    return await this.userCollection.doc(user.id).set(user);
  }

  deleteUser(user) {
    return this.userCollection
      .doc(user.id)
      .delete()
      .then(() => Promise.resolve(user));
  }

  getUser(id): Observable<any> {
    return this.afs
      .doc(`users/${id}`)
      .valueChanges()
      .pipe
      // tap(data => console.log('User', data))
      ();
  }

  getUserByPhone(id) {
    return this.afs
      .doc(`users/${id}`)
      .valueChanges()
      .pipe
      // tap(data => console.log('User', data))
      ();
  }

  async signup(user: any): Promise<any> {
    user.id = user.phone;
    user.date_time = new Date().getTime();
    user.timestamp = new Date().getTime();

    await this.updateUser(user);
    await this.storage.set(this.CURRENT_USER, user.id);
    this.currentUser$.next(user);
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setPhone(user.phone);
      return this.publishUserSignup();
    });
  }

  setPhone(phone: string): Promise<any> {
    return this.storage.set('phone', phone);
  }

  login(user: any) {
    this.getUser(user.phone).subscribe((usr) => {
      if (!usr) {
        this.updateUser(user);
      }
      this.setPhone(usr.phone);
      this.currentUser$.next(usr);
    });
  }

  logout(): Promise<any> {
    return this.afAuth
      .signOut()
      .then(() => this.storage.remove(this.HAS_LOGGED_IN))
      .then(() => this.storage.remove('phone'))
      .then(() => {
        this.publishUserLogout();
        this.currentUser$.next(null);
      });
  }

  uploadFile(event) {
    return this.getCurrentUser().pipe(
      take(1),
      switchMap((user) => {
        const file = event.target.files[0];
        const filePath = user.phone;
        const fileRef = this.afStorage.ref(filePath);
        const task = this.afStorage.upload(filePath, file);

        let downloadURL;

        // observe percentage changes
        const uploadPercent$ = task.percentageChanges();
        // get notified when the download URL is available
        const url$ = task
          .snapshotChanges()
          .pipe(finalize(() => (downloadURL = fileRef.getDownloadURL())));

        return combineLatest([url$, uploadPercent$]);
      })
    );
  }
}
