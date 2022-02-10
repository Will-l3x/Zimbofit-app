import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateProgramPage } from './create-program.page';
import { SharedModule } from '../../shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { RepeatTypeComponent } from '../../shared/components/repeat-type/repeat-type.component';
import { FormlyIonicModule } from '@ngx-formly/ionic';

const routes: Routes = [
  {
    path: '',
    component: CreateProgramPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
      ],
    }),
    IonicModule,
    FormlyIonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateProgramPage]
})
export class CreateProgramPageModule {}
