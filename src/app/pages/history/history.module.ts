import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryPage } from './history.page';
import { SharedModule } from '../../shared/shared.module';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [HistoryPage],
  entryComponents: [
    LoginPopoverComponent
  ]
})
export class HistoryPageModule {}
