import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    // redirectTo: '/start',
    pathMatch: 'full',
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./pages/support/support.module').then((m) => m.SupportModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignUpModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/tabs-page/tabs-page.module').then((m) => m.TabsModule),
  },
  {
    path: 'tutorial',
    loadChildren: () =>
      import('./pages/tutorial/tutorial.module').then((m) => m.TutorialModule),
    canLoad: [CheckTutorial],
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./pages/workouts/workouts.module').then(
        (m) => m.WorkoutsPageModule
      ),
  },
  {
    path: 'trainer-list',
    loadChildren: () =>
      import('./pages/trainer-list/trainer-list.module').then(
        (m) => m.TrainerListPageModule
      ),
  },
  {
    path: 'category-list',
    loadChildren: () =>
      import('./pages/category-list/category-list.module').then(
        (m) => m.CategoryListPageModule
      ),
  },
  {
    path: 'exercises',
    loadChildren: () =>
      import('./pages/exercises/exercises.module').then(
        (m) => m.ExercisesPageModule
      ),
  },
  {
    path: 'workout-detail',
    loadChildren: () =>
      import('./pages/workout-detail/workout-detail.module').then(
        (m) => m.WorkoutDetailPageModule
      ),
  },
  {
    path: 'program-detail',
    loadChildren: () =>
      import('./pages/program-detail/program-detail.module').then(
        (m) => m.ProgramDetailPageModule
      ),
  },
  {
    path: 'exercise-detail',
    loadChildren: () =>
      import('./pages/exercise-detail/exercise-detail.module').then(
        (m) => m.ExerciseDetailPageModule
      ),
  },
  {
    path: 'trainer-detail',
    loadChildren: () =>
      import('./pages/trainer-detail/trainer-detail.module').then(
        (m) => m.TrainerDetailPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./pages/edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
  },
  // { path: 'workout-play', loadChildren:()=> import('./pages/workout-play/workout-play.module#WorkoutPlayPageModule' },
  {
    path: 'start',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./pages/history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: 'fab',
    loadChildren: () => import('./fab/fab.module').then((m) => m.FabPageModule),
  },
  // { path: 'workout-history', loadChildren:()=> import('./pages/workout-history/workout-history.module#WorkoutHistoryPageModule' },
  {
    path: 'graphs',
    loadChildren: () =>
      import('./pages/graphs/graphs.module').then((m) => m.GraphsPageModule),
  },
  {
    path: 'program-schedule',
    loadChildren: () =>
      import('./pages/program-schedule/program-schedule.module').then(
        (m) => m.ProgramSchedulePageModule
      ),
  },
  {
    path: 'workout-schedule',
    loadChildren: () =>
      import('./pages/workout-schedule/workout-schedule.module').then(
        (m) => m.WorkoutSchedulePageModule
      ),
  },
  {
    path: 'workout-edit-schedule',
    loadChildren: () =>
      import('./pages/workout-edit-schedule/workout-edit-schedule.module').then(
        (m) => m.WorkoutEditSchedulePageModule
      ),
  },
  {
    path: 'program-edit-schedule',
    loadChildren: () =>
      import('./pages/program-edit-schedule/program-edit-schedule.module').then(
        (m) => m.ProgramEditSchedulePageModule
      ),
  },
  {
    path: 'create-workout',
    loadChildren: () =>
      import('./pages/create-workout/create-workout.module').then(
        (m) => m.CreateWorkoutPageModule
      ),
  },
  {
    path: 'create-program',
    loadChildren: () =>
      import('./pages/create-program/create-program.module').then(
        (m) => m.CreateProgramPageModule
      ),
  },
  // { path: 'workout-report', loadChildren:()=> import('./pages/workout-report/workout-report.module#WorkoutReportPageModule' },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then(
        (m) => m.CheckoutPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'purchases',
    loadChildren: () =>
      import('./pages/purchases/purchases.module').then(
        (m) => m.PurchasesPageModule
      ),
  },
  {
    path: 'payment-method',
    loadChildren: () =>
      import('./pages/payment-method/payment-method.module').then(
        (m) => m.PaymentMethodPageModule
      ),
  },
  {
    path: 'payment-ecocash',
    loadChildren: () =>
      import('./pages/payment-ecocash/payment-ecocash.module').then(
        (m) => m.PaymentEcocashPageModule
      ),
  },
  {
    path: 'payment-onemoney',
    loadChildren: () =>
      import('./pages/payment-onemoney/payment-onemoney.module').then(
        (m) => m.PaymentOnemoneyPageModule
      ),
  },
  {
    path: 'payment-credit-card',
    loadChildren: () =>
      import('./pages/payment-credit-card/payment-credit-card.module').then(
        (m) => m.PaymentCreditCardPageModule
      ),
  },
  {
    path: 'payment-cash',
    loadChildren: () =>
      import('./pages/payment-cash/payment-cash.module').then(
        (m) => m.PaymentCashPageModule
      ),
  },
  {
    path: 'queries',
    loadChildren: () =>
      import('./pages/queries/queries.module').then((m) => m.QueriesPageModule),
  },
  // { path: 'workout-session', loadChildren:()=> import('./pages/workout-session/workout-session.module#WorkoutSessionPageModule' },
  {
    path: 'session-report',
    loadChildren: () =>
      import('./pages/session-report/session-report.module').then(
        (m) => m.SessionReportPageModule
      ),
  },
  {
    path: 'session',
    loadChildren: () =>
      import('./pages/session/session.module').then((m) => m.SessionPageModule),
  },
  {
    path: 'payment-paypal',
    loadChildren: () =>
      import('./pages/payment-paypal/payment-paypal.module').then(
        (m) => m.PaymentPaypalPageModule
      ),
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
  },  {
    path: 'menuplan',
    loadChildren: () => import('./pages/menuplan/menuplan.module').then( m => m.MenuplanPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
