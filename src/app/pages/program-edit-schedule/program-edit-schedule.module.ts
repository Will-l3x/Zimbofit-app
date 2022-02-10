import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgramEditSchedulePage } from './program-edit-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramEditSchedulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProgramEditSchedulePage,
  ],
  entryComponents: [
  ]
})
export class ProgramEditSchedulePageModule {}
