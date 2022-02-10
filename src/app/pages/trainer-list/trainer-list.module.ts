import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrainerListPage } from './trainer-list.page';
import { TrainerProfileModule } from 'src/app/components/trainer-profile/trainer-profile.module';

const routes: Routes = [
  {
    path: '',
    component: TrainerListPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TrainerProfileModule,
  ],
  declarations: [TrainerListPage],
})
export class TrainerListPageModule {}
