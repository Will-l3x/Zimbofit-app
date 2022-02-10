/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { combineLatest, Subscription, BehaviorSubject } from 'rxjs';
import { ViewService } from '../../../../services/view.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'my-workout-list',
  templateUrl: './my-workout-list.component.html',
  styleUrls: ['./my-workout-list.component.scss'],
})
export class MyWorkoutListComponent implements OnInit, OnDestroy {
  workouts: any[];
  segment = 'all';
  queryText: string;
  search$: BehaviorSubject<string> = new BehaviorSubject('');
  subscription: Subscription;
  viewed = false;

  constructor(
    private userService: UserService,
    private viewService: ViewService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.userService.getAuthoredWorkouts(),
      this.search$,
    ]).subscribe(([workouts, search]) => {
      if (search && search.trim()) {
        this.workouts = workouts.filter((w) =>
          w.name.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.workouts = workouts;
      }

      if (!this.viewed) {
        this.viewService.viewItems('user-authored-workouts');
        this.viewed = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearch(query) {
    this.search$.next(query);
  }

  handleDelete(workout) {
    this.userService.deleteAuthoredWorkout(workout);
  }

  presentFilter() {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.workouts.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
