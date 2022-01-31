import { Component,EventEmitter, Input, Output  } from '@angular/core';
import { Workout } from 'src/app/interfaces/workout.model';

@Component({
  selector: 'app-workout-card2',
  templateUrl: './workout-card2.component.html',
  styleUrls: ['./workout-card2.component.scss'],
})
export class WorkoutCard2Component {
  @Input() item: Workout;
  @Output() clicked = new EventEmitter();
}
