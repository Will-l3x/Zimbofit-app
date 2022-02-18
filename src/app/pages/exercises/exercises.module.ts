import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExerciseFilterComponent } from './components/exercise-filter/exercise-filter.component';
import { ExercisesPage } from './exercises.page';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';

const routes: Routes = [
  {
    path: '',
    component: ExercisesPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    SearchbarModule,
  ],
  declarations: [ExercisesPage, ExerciseFilterComponent],
  entryComponents: [CategoryFilterComponent],
})
export class ExercisesPageModule {}
