import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentEcocashPage } from './payment-ecocash.page';

const routes: Routes = [
  {
    path: ':invoice_id',
    component: PaymentEcocashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentEcocashPage]
})
export class PaymentEcocashPageModule {}
