/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../../../../services/workout.service';
import { combineLatest, Subscription, BehaviorSubject } from 'rxjs';
import { ViewService } from '../../../../services/view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts: any[];
  list: any[];
  limit = 4;
  queryText: string;
  search$: BehaviorSubject<string> = new BehaviorSubject('');
  subscription: Subscription;
  viewed = false;

  constructor(
    private workoutService: WorkoutService,
    private viewService: ViewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.workoutService.getWorkouts(),
      this.search$,
    ]).subscribe(([workouts, search]) => {
      // if (search && search.trim()) {
      //   this.workouts = workouts.filter((w) =>
      //     w.name.toLowerCase().includes(search.toLowerCase())
      //   );
      // } else {
      //   this.workouts = workouts;
      // }

      if (!this.viewed) {
        this.viewService.viewItems('workouts');
        this.viewed = true;
      }
    });
  }

  onSearch(query) {
    this.search$.next(query);
  }

  presentFilter() {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      this.limit =
        this.limit + 4 < this.workouts.length
          ? this.limit + 4
          : this.workouts.length;
      // eslint-disable-next-line no-cond-assign
      if ((this.limit = this.workouts.length)) {
        event.target.disabled = true;
      }
    }, 500);
  }
  goToDetailPage(id: string) {
    this.router.navigate(['/app/tabs/workouts/workout/', id]);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
