import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RatingModule } from '../rating/rating.module';
import { TrainerProfileComponent } from './trainer-profile.component';

@NgModule({
  declarations: [TrainerProfileComponent],
  imports: [CommonModule, IonicModule, RatingModule],
  exports: [TrainerProfileComponent],
  providers: [],
})
export class TrainerProfileModule {}
