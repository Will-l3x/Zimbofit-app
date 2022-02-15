import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TruncateModule } from 'ng2-truncate';

import { IonicModule } from '@ionic/angular';

import { ProgramsPage } from './programs.page';
import { SharedModule } from '../../shared/shared.module';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ProgramListModule } from './components/program-list/program-list.module';
import { MyProgramListModule } from './components/my-program-list/my-program-list.module';

const routes: Routes = [
  {
    path: '',
    component: ProgramsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TruncateModule,
    SharedModule,
    ProgramListModule,
    MyProgramListModule,
  ],
  declarations: [ProgramsPage],
  entryComponents: [CategoryFilterComponent],
})
export class ProgramsPageModule {}
