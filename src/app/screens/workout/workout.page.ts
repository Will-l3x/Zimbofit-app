/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Category } from 'src/app/interfaces/category.model';
import { Exercise } from 'src/app/interfaces/exercise.model';
import { Router } from '@angular/router';
import { Workout } from 'src/app/interfaces/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit, OnDestroy {
  id: string;
  workout: Workout;
  private unsubscribeCat$ = new Subject<void>();
  private unsubscribeExe$ = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  acronym(text) {
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

  ngOnInit() {
    this.workoutService.getWorkout(this.id).subscribe((res) => {
      this.workout = res;
      console.log(this.workout);
    });
  }

  ngOnDestroy() {
    this.unsubscribeCat$.next();
    this.unsubscribeCat$.complete();
    this.unsubscribeExe$.next();
    this.unsubscribeExe$.complete();
  }

  onSlideChange() {
    console.log('slide change');
  }

  goToDetailPage(exercise) {
    this.router.navigate(['exercise-details', exercise.id], {
      state: { exercise },
    });
  }
}
