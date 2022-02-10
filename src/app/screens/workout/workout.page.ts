/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Workout } from 'src/app/interfaces/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit{
  id: string;
  workout: Workout;
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
    });
  }
  goToDetailPage(exercise) {
    this.router.navigate(['exercise-details', exercise.id], {
      state: { exercise },
    });
  }
}
