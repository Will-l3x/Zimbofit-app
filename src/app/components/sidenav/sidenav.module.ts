import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SidenavComponent } from './sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, IonicModule],
    exports: [SidenavComponent],
    providers:[],
})

export class SidenavModule {}
