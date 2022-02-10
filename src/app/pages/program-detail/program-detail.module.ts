import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgramDetailPage } from './program-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { WorkoutListItemModule } from '../workouts/components/workout-list-item/workout-list-item.module';
import { TrainerProfileModule } from 'src/app/components/trainer-profile/trainer-profile.module';

const routes: Routes = [
  {
    path: '',
    component: ProgramDetailPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    WorkoutListItemModule,
    TrainerProfileModule,
  ],
  declarations: [ProgramDetailPage],
})
export class ProgramDetailPageModule {}
