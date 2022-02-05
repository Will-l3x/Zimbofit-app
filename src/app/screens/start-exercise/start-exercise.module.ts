import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartExercisePageRoutingModule } from './start-exercise-routing.module';

import { StartExercisePage } from './start-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartExercisePageRoutingModule
  ],
  declarations: [StartExercisePage]
})
export class StartExercisePageModule {}
