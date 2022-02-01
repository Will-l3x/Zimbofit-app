import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../screens/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'programs',
        loadChildren: () =>
          import('../screens/programs/programs.module').then(
            (m) => m.ProgramsPageModule
          ),
      },
      {
        path: 'workouts',
        loadChildren: () =>
          import('../screens/workouts/workouts.module').then(
            (m) => m.WorkoutsPageModule
          ),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('../screens/history/history.module').then(
            (m) => m.HistoryPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
