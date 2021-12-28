/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, finalize} from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private imageCollection: AngularFirestoreCollection<any>;
    // images$: BehaviorSubject<any> = new BehaviorSubject([]);
    private imageUploads$: BehaviorSubject<any> = new BehaviorSubject({});
    private imageDeletes$: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private afs: AngularFirestore, private http: HttpClient,
        private storage: AngularFireStorage) {
        this.imageCollection = this.afs.collection('images', ref => ref.orderBy('name', 'asc'));
        // this.http.get("./assets/json/images.json").subscribe(images => {
        //     this.images$.next(images);
        // })
    }

    uploadFile(event, post_id) {
        const file = event.target.files[0];
        const filePath = post_id;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        const uploadPercent =   task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            // take(1),
            finalize(() => {
                // console.log(fileRef.getDownloadURL);
                fileRef.getDownloadURL().subscribe(url => {
                    const image: any = { id: post_id, url, post_id };
                    image.date_time = (new Date()).getTime();
                    image.timestamp = (new Date()).getTime();
                    this.updateImage(image);
                });
            }),

        ).subscribe();

        return uploadPercent;
    }

    // getPostImages(post_id:string): Observable<any> {
    //     return this.images$;
    // }

    getImages(): Observable<any[]> {
        return this.imageCollection.valueChanges().pipe(
            tap(data => console.log('Images', data))
        );
    }

    getPostImages(post_id: string) {
        return this.afs.collection('images', ref => ref.where('post_id', '==', post_id)).valueChanges();
    }

    addNewImage(image) {
        image.id = this.afs.createId();
        image.date_time = (new Date()).getTime();
        image.timestamp = (new Date()).getTime();

        return this.updateImage(image);
    }

    updateImage(image) {
        // console.log(image);
        return this.imageCollection.doc(image.id).set(image).then(() => {
            this.imageUploads$.next(image);
            return Promise.resolve(image);
        });
    }

    deleteImage(image) {
        return this.imageCollection.doc(image.id).delete().then(() => this.storage.ref(image.id).delete().subscribe(() => {
                this.imageDeletes$.next(image);
            }));
        // let images = this.images$.value.filter(image => image.id != id);
        // this.images$.next(images);
    }

    getImage(id) {
        return this.afs.doc(`images/${id}`).valueChanges().pipe(
            // tap(data => console.log('Image', data))
        );
    }

    getImageUploads(): Observable<any> {
        return this.imageUploads$;
    }

    getImageDeletes(): Observable<any> {
        return this.imageDeletes$;
    }

    getRandomProductImage() {
        const num = Math.round(Math.random() * 5);
        switch (num) {
            case 0: return 'assets/img/products/advance-card-bttf.png';
            case 1: return 'assets/img/products/advance-card-jp.jpg';
            case 2: return 'assets/img/products/advance-card-tmntr.jpg';
            case 3: return 'assets/img/products/badu-live.png';
            case 4: return 'assets/img/products/nin-live.png';
            case 5: return 'assets/img/products/rundmc-live.png';
        }
    }

    getRandomUserImage() {
        const num = Math.round(Math.random() * 2);
        switch (num) {
            case 0: return 'assets/img/speakers/ian-avatar.png';
            case 1: return 'assets/img/speakers/marty-avatar.png';
            case 2: return 'assets/img/speakers/sarah-avatar.png';
        }
    }
}
