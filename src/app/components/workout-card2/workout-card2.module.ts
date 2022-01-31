import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RatingModule } from '../rating/rating.module';
import { WorkoutCard2Component } from './workout-card2.component';

@NgModule({
  declarations: [WorkoutCard2Component],
  imports: [CommonModule, IonicModule, RatingModule],
  exports: [WorkoutCard2Component],
  providers: [],
})
export class WorkoutCard2Module {}
