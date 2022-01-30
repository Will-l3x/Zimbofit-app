import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MenuIconModule } from 'src/app/components/menu-icon/menu-icon.module';
import { OverviewChartModule } from 'src/app/components/overview-chart/overview-chart.module';
import { ProgramCardModule } from 'src/app/components/program-card/program-card.module';
import { ProgramStatsModule } from 'src/app/components/program-stats/program-stats.module';
import { WorkoutCardModule } from 'src/app/components/workout-card/workout-card.module';
import { WorkoutStatsModule } from 'src/app/components/workout-stats/workout-stats.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MenuIconModule,
    OverviewChartModule,
    ProgramStatsModule,
    WorkoutCardModule,
    ProgramCardModule,
    WorkoutStatsModule,
    SidenavModule,
    SharedDirectivesModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
