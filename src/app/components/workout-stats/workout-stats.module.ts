import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WorkoutStatsComponent } from './workout-stats.component';

@NgModule({
    declarations: [WorkoutStatsComponent],
    imports: [CommonModule, IonicModule],
    exports: [WorkoutStatsComponent],
    providers:[],
})

export class WorkoutStatsModule {}
