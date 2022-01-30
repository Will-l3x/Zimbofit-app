import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { SwiperModule } from 'swiper/angular';
import { WorkoutCardModule } from 'src/app/components/workout-card/workout-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsPageRoutingModule,
    SearchbarModule,
    CategoryItemModule,
    SwiperModule,
    WorkoutCardModule
  ],
  declarations: [WorkoutsPage],
})
export class WorkoutsPageModule {}
