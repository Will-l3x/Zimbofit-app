import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartExercisePage } from './start-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: StartExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartExercisePageRoutingModule {}
