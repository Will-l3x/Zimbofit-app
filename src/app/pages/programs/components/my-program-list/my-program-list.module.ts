import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProgramListItemModule } from '../my-program-list-item/my-program-list-item.module';
import { MyProgramListComponent } from './my-program-list.component';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, SearchbarModule, MyProgramListItemModule],
  exports: [MyProgramListComponent],
  declarations: [MyProgramListComponent],
  providers: [],
})
export class MyProgramListModule {}
