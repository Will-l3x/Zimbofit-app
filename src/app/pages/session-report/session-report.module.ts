import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SessionReportPage } from './session-report.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

const routes: Routes = [
  {
    path: ':sessionId',
    component: SessionReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedDirectivesModule
  ],
  declarations: [SessionReportPage]
})
export class SessionReportPageModule {}
