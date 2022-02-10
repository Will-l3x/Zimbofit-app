/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import { WorkoutSessionService } from '../../services/workout-session.service';

@Component({
  selector: 'session-report',
  templateUrl: './session-report.page.html',
  styleUrls: ['./session-report.page.scss'],
})
export class SessionReportPage implements OnInit {
  session: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sessionService: WorkoutSessionService,
    private userService: UserService,
    // private socialSharing: SocialSharing,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('sessionId');

    this.subscription = this.sessionService
      .getWorkout(id)
      .subscribe((session) => {
        this.session = session;

        console.log(this.session);
      });
  }

  getWorkload(set) {
    const weightMeasurement = set.measurements.find(
      (measurement) => measurement.name === 'weight'
    );
    const repsMeasurement = set.measurements.find(
      (measurement) => measurement.name === 'reps'
    );

    const weight = weightMeasurement.value;
    const reps = repsMeasurement.value;

    return weight * reps;
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: Math.random() * 1000 + 500,
    });
    await loading.present();

    // switch (network) {
    //   case 'Facebook': {
    //     this.socialSharing
    //       .shareViaFacebook(`I completed ${this.session.workout_name} workout`, '', 'https://youtube.com')
    //       .then(() => {
    //         // Success!
    //       })
    //       .catch(() => {
    //         // Error!
    //       });
    //     break;
    //   }
    //   case 'Twitter': {
    //     this.socialSharing
    //       .shareViaTwitter(`I completed ${this.session.workout_name} workout`, '', 'https://youtube.com')
    //       .then(() => {
    //         // Success!
    //       })
    //       .catch(() => {
    //         // Error!
    //       });
    //     break;
    //   }
    //   default: {
    //     //statements;
    //     break;
    //   }
    // }
    await loading.onWillDismiss();
    fab.close();
  }
}
