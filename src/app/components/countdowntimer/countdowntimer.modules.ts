import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CountdowntimerComponent } from './countdowntimer.component';

@NgModule({
    declarations: [CountdowntimerComponent],
    imports: [CommonModule, IonicModule],
    exports: [CountdowntimerComponent],
    providers:[],
})

export class CountdowntimerModule {}
