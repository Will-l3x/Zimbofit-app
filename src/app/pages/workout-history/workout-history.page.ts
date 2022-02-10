import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, BehaviorSubject, Subscription } from 'rxjs';

import { WorkoutService } from '../../services/workout.service';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { UserService } from '../../services/user.service';
import { Session } from '../../interfaces/session';

@Component({
  selector: 'workout-history',
  templateUrl: './workout-history.page.html',
  styleUrls: ['./workout-history.page.scss'],
})
export class WorkoutHistoryPage implements OnInit, OnDestroy {
  public sessions: Session[];
  public workout: any;
  public currentExercise: any;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private sessionService: WorkoutSessionService,
    private workoutService: WorkoutService,
    private userService: UserService) { }

  ngOnInit() {
    const workoutId = this.route.snapshot.paramMap.get('id');
    this.subscription = combineLatest([
      this.workoutService.getWorkout(workoutId),
      this.sessionService.getWorkoutSessions(workoutId)
    ]).subscribe(([workout, sessions]) => {
      this.workout = workout;
      this.sessions = sessions;

      console.log(sessions);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
