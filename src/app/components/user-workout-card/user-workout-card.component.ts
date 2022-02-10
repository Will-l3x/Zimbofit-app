import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workout } from 'src/app/interfaces/workout.model';

@Component({
  selector: 'app-user-workout-card',
  templateUrl: './user-workout-card.component.html',
  styleUrls: ['./user-workout-card.component.scss'],
})
export class UserWorkoutCardComponent {
  @Input() item: Workout;
  @Output() clicked = new EventEmitter();
}
