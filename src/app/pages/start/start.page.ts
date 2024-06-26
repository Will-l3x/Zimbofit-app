/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { combineLatest, Subscription, of } from 'rxjs';
import * as moment from 'moment';
import orderBy from 'lodash/orderBy';
import cloneDeep from 'lodash/cloneDeep';
import { CategoryService } from '../../services/category.service';
import {
  PopoverController,
  ActionSheetController,
  MenuController,
} from '@ionic/angular';
import { StartPageModule } from './start.module';
import { StartWorkoutComponent } from './start-workout/start-workout.component';
import { Router, NavigationExtras } from '@angular/router';
import { ViewService } from '../../services/view.service';
import { UserLocationService } from '../../services/user-location.service';
import { ScheduledWorkoutService } from '../../services/scheduled-workout.service';
import { switchMap, take } from 'rxjs/operators';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';

@Component({
  selector: 'start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit, OnDestroy {
  workouts;
  viewed = false;
  user: any;
  page = 'Dashboard';
  subscription: Subscription;
  popover: any;
   appPages = [
    {
      title: 'Dashboard',
      url: '/app/tabs/dashboard',
      icon: 'home',
    },
    {
      title: 'Start',
      url: '/app/tabs/start',
      icon: 'play',
      requiresUser: true,
    },
    {
      title: 'Programs',
      url: '/app/tabs/programs',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Trainers',
      url: '/app/tabs/trainers',
      icon: 'unlock',
      count: 0,
    },

    {
      title: 'Schedules',
      url: '/app/tabs/schedule',
      icon: 'calendar',
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'contacts',
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
    },
  ];
  constructor(
    private userService: UserService,
    // private categoryService: CategoryService,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private viewService: ViewService,
    private menu: MenuController,
    private scheduledWorkoutService: ScheduledWorkoutService,
    private router: Router
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    this.userService
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.user = user;
          return user
            ? this.scheduledWorkoutService.getUserWorkouts(user.id)
            : of([]);
        })
      )
      .subscribe(async (workouts) => {
        this.popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to schedule workouts' },
        });
        if (!this.user) {
          // await this.popover.present();
        } else {
          if (this.popover) {
            this.popover.dismiss();
          }
          this.workouts = workouts.map((workout) => {
            workout.time = moment(workout.schedule).format('HH:mm');
            workout.due = moment(workout.schedule).fromNow();
            return workout;
          });

          this.workouts = orderBy(
            this.workouts,
            (w) => +moment(w.schedule).format('x')
          );
          console.log(workouts);
        }

        if (!this.viewed) {
          this.viewService.viewItems('start');
          this.viewed = true;
        }
      });
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }
  isOverdue = (workout) => moment().isAfter(new Date(workout.schedule));

  onDelete(workout) {
    this.scheduledWorkoutService.deleteWorkout(workout);
  }

  async onStart(workout) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: workout.name,
      buttons: [
        {
          text: `Start Now`,
          icon: 'play',
          handler: () => {
            this.router.navigate(['session/', workout.workout_id], {
              queryParams: { schedule: workout.id },
            });
          },
        },
        {
          text: `Cancel`,
          icon: 'close',
          handler: () => {
            // this.onDelete(workout);
          },
        },
      ],
    });

    await actionSheet.present();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
