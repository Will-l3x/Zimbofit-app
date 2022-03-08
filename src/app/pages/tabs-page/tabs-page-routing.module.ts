import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

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
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../map/map.module').then((m) => m.MapModule),
          },
        ],
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../about/about.module').then((m) => m.AboutModule),
          },
        ],
      },
      {
        path: 'programs/:categoryId',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../programs/programs.module').then(
                (m) => m.ProgramsPageModule
              ),
          },
          {
            path: 'program/create',
            loadChildren: () =>
              import('../create-program/create-program.module').then(
                (m) => m.CreateProgramPageModule
              ),
          },
          {
            path: 'program/:programId',
            loadChildren: () =>
              import('../program-detail/program-detail.module').then(
                (m) => m.ProgramDetailPageModule
              ),
          },
          {
            path: 'program/schedule/:programId',
            loadChildren: () =>
              import(
                '../program-edit-schedule/program-edit-schedule.module'
              ).then((m) => m.ProgramEditSchedulePageModule),
          },
          {
            path: 'program/edit/:programId',
            loadChildren: () =>
              import('../create-program/create-program.module').then(
                (m) => m.CreateProgramPageModule
              ),
          },
        ],
      },

      {
        path: 'menulist/:catId',
        loadChildren: () =>
          import('../menulist/menulist.module').then(
            (m) => m.MenulistPageModule
          ),
      },
      {
        path: 'mealplan/:id',
        loadChildren: () =>
          import('../mealplan/mealplan.module').then(
            (m) => m.MealplanPageModule
          ),
      },
      {
        path: 'categories-menulist',
        loadChildren: () =>
          import('../category-menulist/category-menulist.module').then(
            (m) => m.CategoryMenulistPageModule
          ),
      },

      {
        path: 'workouts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../workouts/workouts.module').then(
                (m) => m.WorkoutsPageModule
              ),
          },
          {
            path: 'workout/create',
            loadChildren: () =>
              import('../create-workout/create-workout.module').then(
                (m) => m.CreateWorkoutPageModule
              ),
          },
          {
            path: 'workout/edit/:workoutId',
            loadChildren: () =>
              import('../create-workout/create-workout.module').then(
                (m) => m.CreateWorkoutPageModule
              ),
          },
          // {
          //   path: 'workout/play/:workoutId',
          //   loadChildren: () => import('../workout-play/workout-play.module').then(m => m.WorkoutPlayPageModule)
          // },
          // {
          //   path: 'workout/session/:workoutId',
          //   loadChildren: () => import('../workout-session/workout-session.module').then(m => m.WorkoutSessionPageModule)
          // },
          {
            path: 'workout/schedule/:workoutId',
            loadChildren: () =>
              import(
                '../workout-edit-schedule/workout-edit-schedule.module'
              ).then((m) => m.WorkoutEditSchedulePageModule),
          },
          {
            path: 'workout/:workoutId',
            loadChildren: () =>
              import('../workout-detail/workout-detail.module').then(
                (m) => m.WorkoutDetailPageModule
              ),
          },
          // {
          //   path: 'report/:workoutId',
          //   loadChildren: () => import('../workout-report/workout-report.module').then(m => m.WorkoutReportPageModule)
          // },
        ],
      },
      {
        path: 'trainers',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../trainer-list/trainer-list.module').then(
                (m) => m.TrainerListPageModule
              ),
          },
          {
            path: 'trainer/:trainerId',
            loadChildren: () =>
              import('../trainer-detail/trainer-detail.module').then(
                (m) => m.TrainerDetailPageModule
              ),
          },
        ],
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../category-list/category-list.module').then(
                (m) => m.CategoryListPageModule
              ),
          },
        ],
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
            path: 'exercise/:exerciseId',
            loadChildren: () =>
              import('../exercise-detail/exercise-detail.module').then(
                (m) => m.ExerciseDetailPageModule
              ),
          },
        ],
      },
      {
        path: 'queries',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../queries/queries.module').then(
                (m) => m.QueriesPageModule
              ),
          },
        ],
      },
      {
        path: 'start',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../start/start.module').then((m) => m.StartPageModule),
          },
        ],
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import('../history/history.module').then(
                (m) => m.HistoryPageModule
              ),
          },
        ],
      },
      {
        path: 'history/:id',
        loadChildren: () =>
          import('../workout-history/workout-history.module').then(
            (m) => m.WorkoutHistoryPageModule
          ),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: 'checkout',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../checkout/checkout.module').then(
                (m) => m.CheckoutPageModule
              ),
          },
        ],
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cart/cart.module').then((m) => m.CartPageModule),
          },
        ],
      },
      {
        path: 'purchases',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../purchases/purchases.module').then(
                (m) => m.PurchasesPageModule
              ),
          },
        ],
      },
      {
        path: 'payment',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../payment-method/payment-method.module').then(
                (m) => m.PaymentMethodPageModule
              ),
          },
          {
            path: 'ecocash',
            loadChildren: () =>
              import('../payment-ecocash/payment-ecocash.module').then(
                (m) => m.PaymentEcocashPageModule
              ),
          },
          {
            path: 'onemoney',
            loadChildren: () =>
              import('../payment-onemoney/payment-onemoney.module').then(
                (m) => m.PaymentOnemoneyPageModule
              ),
          },
          {
            path: 'credit-card',
            loadChildren: () =>
              import('../payment-credit-card/payment-credit-card.module').then(
                (m) => m.PaymentCreditCardPageModule
              ),
          },
          {
            path: 'cash',
            loadChildren: () =>
              import('../payment-cash/payment-cash.module').then(
                (m) => m.PaymentCashPageModule
              ),
          },
          {
            path: 'paypal',
            loadChildren: () =>
              import('../payment-paypal/payment-paypal.module').then(
                (m) => m.PaymentPaypalPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/app/tabs/categories',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
