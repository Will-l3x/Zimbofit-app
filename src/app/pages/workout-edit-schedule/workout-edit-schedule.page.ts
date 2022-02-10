/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { ScheduledWorkoutService } from '../../services/scheduled-workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'workout-edit-schedule',
  templateUrl: './workout-edit-schedule.page.html',
  styleUrls: ['./workout-edit-schedule.page.scss'],
})
export class WorkoutEditSchedulePage implements OnInit {
  @Input() workout: any;
  user: any;

  constructor(private modalController: ModalController,
    private router: Router,
    private toastController: ToastController,
    private userService: UserService,
    private scheduledWorkoutService: ScheduledWorkoutService,
    private navParams: NavParams) { }

  ngOnInit() {
    this.workout = this.navParams.get('workout');
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

  onSave() {
    // this.userService.updateScheduledWorkout(this.workout);
    if (this.user) {
      this.scheduledWorkoutService.updateWorkout({
        id: this.scheduledWorkoutService.getNewId(),
        workout: this.workout,
        workout_name: this.workout.name,
        workout_id: this.workout.id,
        schedule: this.workout.schedule,
        user_id: this.user.id,
        user_name: this.user.name,
        user_gender: this.user.gender
      });
      this.modalController.dismiss();
      this.toastController.create({
        message: 'Workout Scheduled Successful!',
        position: 'top',
        duration: 3000
      }).then(toast => {
        toast.present();
        this.router.navigateByUrl('/app/tabs/start');
      });
    } else {
      this.toastController.create({
        message: 'Please login first!',
        position: 'top',
        duration: 3000
      }).then(toast => toast.present());
    }
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
