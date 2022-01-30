import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercise.model';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent {
  @Input() item: Exercise;
  @Output() clicked = new EventEmitter();
}
