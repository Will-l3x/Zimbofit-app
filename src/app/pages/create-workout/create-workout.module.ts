import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateWorkoutPage } from './create-workout.page';
import { FormlyModule } from '@ngx-formly/core';
import { RepeatTypeComponent } from '../../shared/components/repeat-type/repeat-type.component';
import { SharedModule } from '../../shared/shared.module';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkoutPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyModule.forRoot({
      types: [{ name: 'repeat', component: RepeatTypeComponent }],
    }),
    IonicModule,
    FormlyIonicModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateWorkoutPage],
})
export class CreateWorkoutPageModule {}
