import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealplanPageRoutingModule } from './mealplan-routing.module';

import { MealplanPage } from './mealplan.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealplanPageRoutingModule,
    SharedDirectivesModule,
  ],
  declarations: [MealplanPage],
})
export class MealplanPageModule {}
