import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkoutHistoryPage } from './workout-history.page';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { ExerciseHistoryComponent } from './exercise-history/exercise-history.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: WorkoutHistoryPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedDirectivesModule,
  ],
  declarations: [
    WorkoutHistoryPage,
    WorkoutChartComponent,
    ExerciseHistoryComponent,
  ],
})
export class WorkoutHistoryPageModule {}
