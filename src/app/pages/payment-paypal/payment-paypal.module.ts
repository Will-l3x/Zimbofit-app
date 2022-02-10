import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentPaypalPage } from './payment-paypal.page';

const routes: Routes = [
  {
    path: ':invoice_id',
    component: PaymentPaypalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentPaypalPage]
})
export class PaymentPaypalPageModule {}
