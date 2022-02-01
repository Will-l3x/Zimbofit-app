/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { Category } from 'src/app/interfaces/category.model';
import { Workout } from 'src/app/interfaces/workout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit, OnDestroy {
  categories$: Category[] = [];
  workouts$: Workout[] = [];
  private unsubscribeCat$ = new Subject<void>();
  private unsubscribeExe$ = new Subject<void>();
  constructor(
    private categoryService: CategoryService,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  acronym(text) {
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

  ngOnInit() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.unsubscribeCat$))
      .subscribe((res) => {
        this.categories$ = [
          {
            active: true,
            description: 'all',
            id: 'all',
            image_url: 'assets/img/home/exercise.svg',
            name: 'All',
            timestamp: parseInt(Date.now().toFixed(), 10),
            date_time: parseInt(Date.now().toFixed(), 10),
          },
        ];
        const categories = [];
        for (const category of res) {
          category.active = false;
          category.name =
            category.name.length >= 32
              ? this.acronym(category.name)
              : category.name;
          category.image_url = 'assets/img/home/programs.svg';
          categories.push(category);
        }
        this.categories$ = this.categories$.concat(categories);
        console.log(categories);
      });
    this.workoutService
      .getWorkouts()
      .pipe(takeUntil(this.unsubscribeExe$))
      .subscribe((res) => {
        /* this.workouts$ = [];
         const workouts = [];
          for (const workout of res) {
            workout.name =
              workout.name.length >= 32
                ? this.acronym(workout.name)
                : workout.name;
            workouts.push(workout);
         */
        console.log(res);
        this.workouts$ = res;
      });
  }

  ngOnDestroy() {
    this.unsubscribeCat$.next();
    this.unsubscribeCat$.complete();
    this.unsubscribeExe$.next();
    this.unsubscribeExe$.complete();
  }

  goToDetailPage(id: string) {
    this.router.navigate(['workout', id]);
  }
}
