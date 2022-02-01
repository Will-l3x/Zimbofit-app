import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramsPageRoutingModule } from './programs-routing.module';

import { ProgramsPage } from './programs.page';
import { ProgramCardModule } from 'src/app/components/program-card/program-card.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramsPageRoutingModule,
    ProgramCardModule,
    SearchbarModule,
  ],
  declarations: [ProgramsPage],
})
export class ProgramsPageModule {}
