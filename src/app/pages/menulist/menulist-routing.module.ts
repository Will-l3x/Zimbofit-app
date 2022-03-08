import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenulistPage } from './menulist.page';

const routes: Routes = [
  {
    path: '',
    component: MenulistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenulistPageRoutingModule {}
