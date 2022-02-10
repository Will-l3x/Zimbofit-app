import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkoutDetailPage } from './workout-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { WorkoutEditSchedulePage } from '../workout-edit-schedule/workout-edit-schedule.page';
import { WorkoutEditSchedulePageModule } from '../workout-edit-schedule/workout-edit-schedule.module';
import { ExerciseCardModule } from 'src/app/components/exercise-card/exercise-card.module';
import { TrainerProfileModule } from 'src/app/components/trainer-profile/trainer-profile.module';

const routes: Routes = [
  {
    path: '',
    component: WorkoutDetailPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    WorkoutEditSchedulePageModule,
    ExerciseCardModule,
    TrainerProfileModule,
  ],
  declarations: [WorkoutDetailPage],
  entryComponents: [WorkoutEditSchedulePage],
})
export class WorkoutDetailPageModule {}
