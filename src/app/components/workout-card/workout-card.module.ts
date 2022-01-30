import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RatingModule } from '../rating/rating.module';
import { WorkoutCardComponent } from './workout-card.component';

@NgModule({
  declarations: [WorkoutCardComponent],
  imports: [CommonModule, IonicModule, RatingModule],
  exports: [WorkoutCardComponent],
  providers: [],
})
export class WorkoutCardModule {}
