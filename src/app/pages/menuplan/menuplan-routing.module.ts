import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuplanPage } from './menuplan.page';

const routes: Routes = [
  {
    path: '',
    component: MenuplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuplanPageRoutingModule {}
