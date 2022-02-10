import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TruncateModule } from 'ng2-truncate';
import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { SharedModule } from '../../shared/shared.module';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TruncateModule
  ],
  declarations: [
    ProfilePage
  ],
  entryComponents: [
    LoginPopoverComponent
  ]
})
export class ProfilePageModule {}
