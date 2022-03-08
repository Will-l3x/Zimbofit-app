import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryMenulistPage } from './category-menulist.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryMenulistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryMenulistPageRoutingModule {}
