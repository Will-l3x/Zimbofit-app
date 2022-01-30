import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutPageRoutingModule } from './workout-routing.module';

import { WorkoutPage } from './workout.page';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
import { ExerciseCardModule } from 'src/app/components/exercise-card/exercise-card.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutPageRoutingModule,
    SearchbarModule,
    CategoryItemModule,
    SwiperModule,
    ExerciseCardModule
  ],
  declarations: [WorkoutPage]
})
export class WorkoutPageModule {}
