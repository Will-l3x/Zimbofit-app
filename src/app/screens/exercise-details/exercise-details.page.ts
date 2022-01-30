import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/interfaces/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.page.html',
  styleUrls: ['./exercise-details.page.scss'],
  providers: [ExerciseService],
})
export class ExerciseDetailsPage implements OnInit {
  id: string;
  exercise: Exercise;
  constructor(
    private activatedRoute: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.exerciseService.getExercise(this.id).subscribe((res) => {
      this.exercise = res;
    });
  }
}
