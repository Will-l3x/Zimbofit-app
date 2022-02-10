import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramListItemComponent } from './program-list-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule,],
  exports: [ProgramListItemComponent],
  declarations: [ProgramListItemComponent],
  providers: [],
})
export class ProgramListItemModule {}
