import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RatingModule } from '../rating/rating.module';
import { UserWorkoutCardComponent } from './user-workout-card.component';

@NgModule({
  declarations: [UserWorkoutCardComponent],
  imports: [CommonModule, IonicModule, RatingModule],
  exports: [UserWorkoutCardComponent],
  providers: [],
})
export class UserWorkoutCardModule {}
