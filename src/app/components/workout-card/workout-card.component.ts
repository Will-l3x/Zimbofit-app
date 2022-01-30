import { Component,EventEmitter, Input, Output  } from '@angular/core';
import { Workout } from 'src/app/interfaces/workout.model';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent {
  @Input() item: Workout;
  @Output() clicked = new EventEmitter();
}
