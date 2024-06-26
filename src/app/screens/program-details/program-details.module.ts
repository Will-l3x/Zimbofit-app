import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramDetailsPageRoutingModule } from './program-details-routing.module';

import { ProgramDetailsPage } from './program-details.page';
import { WorkoutCard2Module } from 'src/app/components/workout-card2/workout-card2.module';
import { RatingModule } from 'src/app/components/rating/rating.module';
import { TrainerProfileModule } from 'src/app/components/trainer-profile/trainer-profile.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramDetailsPageRoutingModule,
    WorkoutCard2Module,
    TrainerProfileModule,
    SharedDirectivesModule,
    RatingModule,
  ],
  declarations: [ProgramDetailsPage],
})
export class ProgramDetailsPageModule {}
