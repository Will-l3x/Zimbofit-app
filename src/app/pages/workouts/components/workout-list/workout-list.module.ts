import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { WorkoutCardModule } from 'src/app/components/workout-card/workout-card.module';
import { WorkoutListItemModule } from '../workout-list-item/workout-list-item.module';
import { WorkoutListComponent } from './workout-list.component';

@NgModule({
  imports: [CommonModule,IonicModule, WorkoutListItemModule, WorkoutCardModule, SearchbarModule],
  exports: [WorkoutListComponent],
  declarations: [WorkoutListComponent],
  providers: [],
})
export class WorkoutListModule {}
