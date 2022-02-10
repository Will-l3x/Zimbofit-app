import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription, combineLatest } from 'rxjs';

import { Session } from '../../interfaces/session';
import { SessionExercise } from '../../interfaces/session-exercise';
import { ScheduledWorkoutService } from '../../services/scheduled-workout.service';
import { UserService } from '../../services/user.service';
import { WorkoutService } from '../../services/workout.service';
import { SessionExerciseComponent } from '../session-exercise/session-exercise.component';
import { WorkoutSessionService } from '../../services/workout-session.service';

@Component({
  selector: 'session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {

  session: Session;
  scheduleId: string;
  subscription: Subscription;
  outstandingExercises: SessionExercise[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private scheduledWorkoutService: ScheduledWorkoutService,
    private userService: UserService,
    private workoutService: WorkoutService,
    private sessionService: WorkoutSessionService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('workoutId');
    const params = this.route.snapshot.queryParams;
    console.log(params);
    if (params) {
      this.scheduleId = params.schedule;
    }
    console.log(id);
    this.subscription = combineLatest([
      this.workoutService.getWorkout(id),
      this.userService.getCurrentUser()
    ]).subscribe(async ([workout, user]) => {
      this.session = {
        id: this.workoutService.getNewId(),
        session_exercises: await this.workoutService.getWorkoutSessionExercises(workout),
        timestamp: new Date().getTime(),
        user_id: user.id,
        user_name: user.name,
        workout_id: workout.id,
        workout_name: workout.name,
      };

      console.log(this.session);
      this.outstandingExercises = this.session.session_exercises.filter(exercise => !exercise.completed);
    });
  }

  async onExerciseStart(sessionExercise) {
    const modal = await this.modalCtrl.create({
      component: SessionExerciseComponent,
      componentProps: { sessionExercise }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      if (data.event === 'completed') {
        const exercise = this.session.session_exercises.find(ex => ex.id === data.exercise.id);
        exercise.sets = data.sets;
        exercise.completed = true;
      }

      this.outstandingExercises = this.session.session_exercises.filter(exercise => !exercise.completed);
    }

    console.log(this.session);
  }

  onSessionComplete() {
    this.sessionService.updateWorkout(this.session);
    if (this.scheduleId) {
      this.scheduledWorkoutService.deleteWorkout(this.scheduleId);
    }
    this.router.navigateByUrl('/app/tabs/history');
  }
}
