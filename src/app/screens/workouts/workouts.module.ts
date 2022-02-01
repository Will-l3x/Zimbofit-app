import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { WorkoutCardModule } from 'src/app/components/workout-card/workout-card.module';
import { WorkoutCard2Module } from 'src/app/components/workout-card2/workout-card2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsPageRoutingModule,
    SearchbarModule,
    CategoryItemModule,
    WorkoutCardModule,
    WorkoutCard2Module
  ],
  declarations: [WorkoutsPage],
})
export class WorkoutsPageModule {}
