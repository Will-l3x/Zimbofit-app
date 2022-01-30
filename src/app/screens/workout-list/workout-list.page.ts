import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout } from 'src/app/interfaces/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
})
export class WorkoutListPage implements OnInit {
  id: string;
  workout: Workout;
  constructor(
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.workoutService.getWorkout(this.id).subscribe((res) => {
      this.workout = res;
    });
  }
}
