import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'exercise-details/:id',
    loadChildren: () =>
      import('./screens/exercise-details/exercise-details.module').then(
        (m) => m.ExerciseDetailsPageModule
      ),
  },
  {
    path: 'program-details/:id',
    loadChildren: () =>
      import('./screens/program-details/program-details.module').then(
        (m) => m.ProgramDetailsPageModule
      ),
  },
  {
    path: 'workout/:id',
    loadChildren: () =>
      import('./screens/workout/workout.module').then(
        (m) => m.WorkoutPageModule
      ),
  },
  {
    path: 'workout-list/:id',
    loadChildren: () =>
      import('./screens/workout-list/workout-list.module').then(
        (m) => m.WorkoutListPageModule
      ),
  },
  {
    path: 'exercise-list/:id',
    loadChildren: () =>
      import('./screens/exercise-list/exercise-list.module').then(
        (m) => m.ExerciseListPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
