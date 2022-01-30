import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramDetailsPageRoutingModule } from './program-details-routing.module';

import { ProgramDetailsPage } from './program-details.page';
import { WorkoutCardModule } from 'src/app/components/workout-card/workout-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramDetailsPageRoutingModule,
    WorkoutCardModule,
  ],
  declarations: [ProgramDetailsPage]
})
export class ProgramDetailsPageModule {}
