import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workout } from 'src/app/interfaces/workout.model';

@Component({
  selector: 'app-workout-stats',
  templateUrl: './workout-stats.component.html',
  styleUrls: ['./workout-stats.component.scss'],
})
export class WorkoutStatsComponent {
  @Input() item: Workout;
  @Output() clicked = new EventEmitter();
}
