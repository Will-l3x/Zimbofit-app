import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseListPageRoutingModule } from './exercise-list-routing.module';

import { ExerciseListPage } from './exercise-list.page';
import { ExerciseCardModule } from 'src/app/components/exercise-card/exercise-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseListPageRoutingModule,
    ExerciseCardModule,
  ],
  declarations: [ExerciseListPage],
})
export class ExerciseListPageModule {}
