import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OverviewChartComponent } from './overview-chart.component';
@NgModule({
    declarations:[OverviewChartComponent],
    imports:[CommonModule,IonicModule],
    exports:[OverviewChartComponent],
})
export class OverviewChartModule {};
