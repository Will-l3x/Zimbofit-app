import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { MyWorkoutListItemModule } from '../my-workout-list-item/my-workout-list-item.module';
import { MyWorkoutListComponent } from './my-workout-list.component';

@NgModule({
  imports: [CommonModule,IonicModule, MyWorkoutListItemModule, SearchbarModule],
  exports: [MyWorkoutListComponent],
  declarations: [MyWorkoutListComponent],
  providers: [],
})
export class MyWorkoutListModule {}
