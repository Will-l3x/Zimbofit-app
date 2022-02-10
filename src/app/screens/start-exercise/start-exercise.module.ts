import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartExercisePageRoutingModule } from './start-exercise-routing.module';

import { StartExercisePage } from './start-exercise.page';
import { WorkoutCard2Module } from 'src/app/components/workout-card2/workout-card2.module';
import { WorkoutCardModule } from 'src/app/components/workout-card/workout-card.module';
import { ProgramCardModule } from 'src/app/components/program-card/program-card.module';
import { ExerciseCardModule } from 'src/app/components/exercise-card/exercise-card.module';
import { UserWorkoutCardModule } from 'src/app/components/user-workout-card/user-workout-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartExercisePageRoutingModule,
    WorkoutCard2Module,
    WorkoutCardModule,
    ProgramCardModule,
    ExerciseCardModule,
    UserWorkoutCardModule
  ],
  declarations: [StartExercisePage]
})
export class StartExercisePageModule {}
