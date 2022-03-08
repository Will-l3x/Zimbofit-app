import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealplanPage } from './mealplan.page';

const routes: Routes = [
  {
    path: '',
    component: MealplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealplanPageRoutingModule {}
