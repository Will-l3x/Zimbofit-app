import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SessionPage } from './session.page';
import { SessionExerciseComponent } from '../session-exercise/session-exercise.component';
import { SessionExerciseSetComponent } from '../session-exercise-set/session-exercise-set.component';
import { SessionExerciseSetAdjustComponent } from '../session-exercise-set-adjust/session-exercise-set-adjust.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

const routes: Routes = [
  {
    path: ':workoutId',
    component: SessionPage,
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
    SessionPage,
    SessionExerciseComponent,
    SessionExerciseSetComponent,
    SessionExerciseSetAdjustComponent,
  ],
  entryComponents: [
    SessionExerciseComponent,
    SessionExerciseSetAdjustComponent,
  ],
})
export class SessionPageModule {}
