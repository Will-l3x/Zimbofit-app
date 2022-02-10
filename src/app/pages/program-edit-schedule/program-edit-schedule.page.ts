/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { Subscription, combineLatest } from 'rxjs';
import cloneDeep from 'lodash/cloneDeep';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { OfflineService } from '../../services/offline.service';
import { ScheduledWorkoutService } from '../../services/scheduled-workout.service';

@Component({
  selector: 'program-edit-schedule',
  templateUrl: './program-edit-schedule.page.html',
  styleUrls: ['./program-edit-schedule.page.scss'],
})
export class ProgramEditSchedulePage implements OnInit, OnDestroy {
  program: any;
  min = '2019';
  max = '2030';
  editDates = true;
  editDays = false;
  startDate: any;
  user: any;

  offline = true;
  subscription: Subscription;

  repeat: any;
  repeats = [
    {
      name: 'None',
    },
    // {
    //   name: 'Daily'
    // },
    {
      name: 'Weekly',
    },
    // {
    //   name: 'Monthly'
    // }
  ];
  // disableRepeat = false;
  // days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    private userService: UserService,
    private scheduledWorkoutService: ScheduledWorkoutService,
    private programService: ProgramService,
    private toastController: ToastController,
    private offlineService: OfflineService
  ) {
    this.repeat = this.repeats[0];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('programId');
    this.subscription = combineLatest([
      this.programService.getProgram(id),
      this.offlineService.isOffline(),
      this.userService.getCurrentUser(),
    ]).subscribe(([program, offline, user]) => {
      (this.program = program), (this.offline = offline), (this.user = user);
    });

    const today = new Date();
    this.min = moment(today).format('YYYY-MM-DDTHH:mm');
    this.max = (today.getFullYear() + 1).toString();
    // console.log(this.min);
  }

  getFromNow(workout) {
    if (workout.schedule) {
      return moment(workout.schedule).fromNow();
    } else {
      return '';
    }
  }

  onRepeat() {}

  isPast(workout) {
    const date = new Date();
    return !moment(workout.schedule).isAfter(moment(date));
  }

  onReset() {
    this.repeat = this.repeats[0];
    this.program.wrks.forEach((workout) => {
      workout.schedule = '';
      return cloneDeep(workout);
    });
  }

  print(data) {
    console.log(data);
  }

  onSave() {
    console.log(this.program);
    // this.userService.updateScheduledProgram(this.program);
    if (this.user) {
      this.program.wrks.forEach((workout) => {
        this.scheduledWorkoutService.updateWorkout({
          id: this.scheduledWorkoutService.getNewId(),
          workout,
          workout_name: workout.name,
          workout_id: workout.id,
          schedule: workout.schedule,
          program_id: this.program.id,
          program: this.program,
          user_id: this.user.id,
          user_name: this.user.name,
          user_gender: this.user.gender,
        });
      });
      this.toastController
        .create({
          message: 'Program Scheduled Successful!',
          position: 'top',
          duration: 3000,
        })
        .then((toast) => {
          toast.present();
          this.router.navigateByUrl('/app/tabs/start');
        });
    } else {
      this.toastController
        .create({
          message: 'Please login first!',
          position: 'top',
          duration: 3000,
        })
        .then((toast) => toast.present());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
