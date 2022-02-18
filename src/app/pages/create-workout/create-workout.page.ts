/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { combineLatest, of, BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { ExerciseService } from '../../services/exercise.service';
import { CategoryService } from '../../services/category.service';
import { MuscleGroupService } from '../../services/muscle-group.service';
import { TrainerService } from '../../services/trainer.service';
import { UserService } from '../../services/user.service';
import { UserWorkoutService } from '../../services/user-workout.service';

@Component({
  selector: 'create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit, OnDestroy {
  form = new FormGroup({});
  model: any;
  fields: FormlyFieldConfig[] = [];

  exercises$: BehaviorSubject<any> = new BehaviorSubject([]);
  exercises: any[];
  edit = false;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private exerciseService: ExerciseService,
    private categoryService: CategoryService,
    private trainerService: TrainerService,
    private userWorkoutService: UserWorkoutService,
    private muscleGroupService: MuscleGroupService
  ) {}

  ngOnInit() {
    let workout$;
    const id = this.route.snapshot.paramMap.get('workoutId');
    if (id) {
      workout$ = this.userWorkoutService.getWorkout(id);
      this.edit = true;
    } else {
      workout$ = of(null);
      this.edit = false;
    }
    const fields$ = this.userWorkoutService.getFields();
    const user$ = this.userService.getCurrentUser();
    const exercises$ = this.exerciseService.getExercises();
    console.log(fields$);
    const fctrl = {};
    this.subscription = combineLatest([
      workout$,
      exercises$,
      fields$,
      user$,
    ]).subscribe(([workout, exercises, fields, user]) => {
      if (user) {
        this.exercises = exercises;
        this.exercises$.next(exercises);
        this.fields = fields.map((f) => {
          fctrl[f.key] = new FormControl();

          if (f.key === 'category_id') {
            f.templateOptions.options = this.categoryService.getCategories();
          }

          if (f.key === 'muscleGroup_ids') {
            f.templateOptions.options = this.muscleGroupService
              .getMuscleGroups()
              .pipe(take(1));
            f.hooks = {
              onInit: () => {
                f.formControl.valueChanges.subscribe((muscles) => {
                  const exs = this.exercises.filter((exercise) =>
                    muscles.find((muscle) => muscle === exercise.muscleGroup_id)
                  );
                  this.exercises$.next(exs);
                });
              },
            };
          }
          if (f.key === 'exercises') {
            f.fieldArray.fieldGroup.map((fg) => {
              if (fg.key === 'exercise_id') {
                fg.templateOptions.options = this.exercises$;
              }
              if (fg.key === 'reps') {
                fg.hideExpression = (model) => {
                  const exercise = this.exercises.find(
                    (e) => e.id === model.exercise_id
                  );
                  return (
                    !exercise ||
                    (exercise.type !== '2' && exercise.type !== '5')
                  );
                };
              }
              if (fg.key === 'weight') {
                fg.hideExpression = (model) => {
                  const exercise = this.exercises.find(
                    (e) => e.id === model.exercise_id
                  );
                  return !exercise || exercise.type !== '5';
                };
              }
              if (fg.key === 'distance') {
                fg.hideExpression = (model) => {
                  const exercise = this.exercises.find(
                    (e) => e.id === model.exercise_id
                  );
                  return !exercise || exercise.type !== '6';
                };
              }
              if (fg.key === 'time') {
                fg.hideExpression = (model) => {
                  const exercise = this.exercises.find(
                    (e) => e.id === model.exercise_id
                  );
                  return (
                    !exercise ||
                    (exercise.type !== '1' && exercise.type !== '6')
                  );
                };
              }

              return fg;
            });
          }

          return f;
        });
        // console.log(fields);
        // console.log(this.form);
        if (workout) {
          this.model = workout;
        } else {
          this.model = {
            id: this.userWorkoutService.getNewId(),
            timestamp: new Date().getTime(),
            user_id: user.id,
          };
        }

        console.log(this.fields);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submit(model) {
    console.log(model);
    this.userWorkoutService.updateWorkout(model);
    this.router.navigateByUrl(`app/tabs/workouts/workout/${model.id}`);
  }
}
