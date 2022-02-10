import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProgramListItemComponent } from './my-program-list-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  exports: [MyProgramListItemComponent],
  declarations: [MyProgramListItemComponent],
  providers: [],
})
export class MyProgramListItemModule {}
