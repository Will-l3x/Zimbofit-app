import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryMenulistPageRoutingModule } from './category-menulist-routing.module';

import { CategoryMenulistPage } from './category-menulist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryMenulistPageRoutingModule
  ],
  declarations: [CategoryMenulistPage]
})
export class CategoryMenulistPageModule {}
