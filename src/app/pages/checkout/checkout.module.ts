import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckoutPage } from './checkout.page';
import { SharedModule } from '../../shared/shared.module';
import { PaymentMethodPage } from '../payment-method/payment-method.page';
import { PaymentMethodPageModule } from '../payment-method/payment-method.module';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    PaymentMethodPageModule
  ],
  declarations: [
    CheckoutPage
  ],
  entryComponents: [
    PaymentMethodPage
  ]
})
export class CheckoutPageModule {}
