import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPage } from './workouts.page';
import { TruncateModule } from 'ng2-truncate';
import { SharedModule } from '../../shared/shared.module';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { WorkoutListModule } from './components/workout-list/workout-list.module';
import { MyWorkoutListModule } from './components/my-workout-list/my-workout-list.module';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TruncateModule,
    SharedModule,
    WorkoutListModule,
    MyWorkoutListModule,
  ],
  declarations: [
    WorkoutsPage,
  ],
  entryComponents: [CategoryFilterComponent],
})
export class WorkoutsPageModule {}
