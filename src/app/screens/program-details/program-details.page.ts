import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/interfaces/program.model';
import { Workout } from 'src/app/interfaces/workout.model';
import { ProgramService } from 'src/app/services/program.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.page.html',
  styleUrls: ['./program-details.page.scss'],
})
export class ProgramDetailsPage implements OnInit {
  id: string;
  program: Program;
  workouts$: Workout[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private programService: ProgramService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.programService.getProgram(this.id).subscribe((res) => {
      this.program = res;
      console.log(res);

      res.workouts.map((workout) => {
        this.workoutService.getWorkout(workout.workout_id).subscribe((_res) => {
          workout = Object.assign(workout, _res);
          this.workouts$.push(workout);
        });
      });
      console.log(this.workouts$);
    });
  }
  goToWorkoutDetailPage(id) {
    this.router.navigate(['workout', id]);
  }
}
