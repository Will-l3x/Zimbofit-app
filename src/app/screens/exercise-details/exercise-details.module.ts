import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseDetailsPageRoutingModule } from './exercise-details-routing.module';

import { ExerciseDetailsPage } from './exercise-details.page';
import { BadgeModule } from 'src/app/components/badge/badge.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { CountdowntimerModule } from 'src/app/components/countdowntimer/countdowntimer.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseDetailsPageRoutingModule,
    BadgeModule,
    SharedDirectivesModule,
    CountdowntimerModule
  ],
  declarations: [ExerciseDetailsPage]
})
export class ExerciseDetailsPageModule {}
