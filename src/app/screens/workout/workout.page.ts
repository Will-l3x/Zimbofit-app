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
  categories$: Category[] = [];
  exercises$: Exercise[] = [];
  private unsubscribeCat$ = new Subject<void>();
  private unsubscribeExe$ = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
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
    this.exerciseService
      .getExercises()
      .pipe(takeUntil(this.unsubscribeExe$))
      .subscribe((res) => {
        this.exercises$ = [];
        const exercises = [];
        for (const exercise of res) {
          exercise.name =
            exercise.name.length >= 32
              ? this.acronym(exercise.name)
              : exercise.name;
          exercise.image_url =
            exercise.image_url === ''
              ? 'assets/img/home/category.jpg'
              : exercise.image_url;
          exercises.push(exercise);
        }
        this.exercises$ = this.exercises$.concat(exercises);
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

  goToDetailPage(id: string) {
    this.router.navigate(['exercise-details', id]);
  }
}
