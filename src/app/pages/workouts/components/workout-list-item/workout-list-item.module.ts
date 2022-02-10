import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkoutListItemComponent } from './workout-list-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  exports: [WorkoutListItemComponent],
  declarations: [WorkoutListItemComponent],
  providers: [],
})
export class WorkoutListItemModule {}
