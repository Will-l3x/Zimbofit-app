import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuplanPageRoutingModule } from './menuplan-routing.module';

import { MenuplanPage } from './menuplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuplanPageRoutingModule
  ],
  declarations: [MenuplanPage]
})
export class MenuplanPageModule {}
