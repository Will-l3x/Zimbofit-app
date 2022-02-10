import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkoutEditSchedulePage } from './workout-edit-schedule.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: WorkoutEditSchedulePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [
    WorkoutEditSchedulePage
  ],
  exports: [
    WorkoutEditSchedulePage
  ]
})
export class WorkoutEditSchedulePageModule {}
