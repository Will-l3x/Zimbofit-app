import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyWorkoutListItemComponent } from './my-workout-list-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  exports: [MyWorkoutListItemComponent],
  declarations: [MyWorkoutListItemComponent],
  providers: [],
})
export class MyWorkoutListItemModule {}
