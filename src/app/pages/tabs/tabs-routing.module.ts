import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../exercises/exercises.module').then(
                (m) => m.ExercisesPageModule
              ),
          },
        ],
      },
      {
        path: 'programs',
        loadChildren: () =>
          import('../programs/programs.module').then(
            (m) => m.ProgramsPageModule
          ),
      },
      {
        path: 'workouts',
        loadChildren: () =>
          import('../workouts/workouts.module').then(
            (m) => m.WorkoutsPageModule
          ),
      },
      {
        path: 'exercises',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../exercises/exercises.module').then(
                (m) => m.ExercisesPageModule
              ),
          },
          {
            path: 'exercise-details',
            loadChildren: () =>
              import('../exercise-details/exercise-details.module').then(
                (m) => m.ExerciseDetailsPageModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
