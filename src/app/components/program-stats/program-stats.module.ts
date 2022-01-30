import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProgramStatsComponent } from './program-stats.component';

@NgModule({
    declarations: [ProgramStatsComponent],
    imports: [CommonModule, IonicModule],
    exports: [ProgramStatsComponent],
    providers:[],
})

export class ProgramStatsModule {}
