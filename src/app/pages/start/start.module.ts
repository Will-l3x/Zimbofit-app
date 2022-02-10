import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StartPage } from './start.page';
import { SharedModule } from '../../shared/shared.module';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';
import { UserWorkoutCardModule } from 'src/app/components/user-workout-card/user-workout-card.module';

const routes: Routes = [
  {
    path: '',
    component: StartPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    UserWorkoutCardModule,
  ],
  declarations: [StartPage, StartWorkoutComponent],
  entryComponents: [StartWorkoutComponent, LoginPopoverComponent],
})
export class StartPageModule {}
