import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from 'src/app/interfaces/exercise.model';
import { Workout } from 'src/app/interfaces/workout.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {
  id: string;
  workout: Workout;
  exercises$: Exercise[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.workoutService.getWorkout(this.id).subscribe((res) => {
      this.workout = res;
      console.log(res);
      res.exercises.map((exercise) => {
        this.exerciseService
          .getExercise(exercise.exercise_id)
          .subscribe((_res) => {
            exercise = Object.assign(exercise, _res);
            this.exercises$.push(exercise);
          });
      });
    });
  }
  goToExerciseDetailPage(id) {
    this.router.navigate(['exercise-details', id]);
  }
}
