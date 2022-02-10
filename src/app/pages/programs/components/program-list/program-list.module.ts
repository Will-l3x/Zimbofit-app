import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramListItemModule } from '../program-list-item/program-list-item.module';
import { ProgramListComponent } from './program-list.component';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, SearchbarModule, ProgramListItemModule],
  exports: [ProgramListComponent],
  declarations: [ProgramListComponent],
  providers: [],
})
export class ProgramListModule {}
