/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import groupBy from 'lodash/groupBy';
import * as moment from 'moment';
import { combineLatest, Subscription } from 'rxjs';
import { MenuController, PopoverController } from '@ionic/angular';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { ViewService } from '../../services/view.service';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  sessions: any[];
  sessionGroups: any[] = [];
  subscription: Subscription;
  viewed = false;
  page = 'History';
  appPages = [
    {
      title: 'Dashboard',
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
  user;
  constructor(
    private workoutService: WorkoutSessionService,
    private userService: UserService,
    private categoryService: CategoryService,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private viewService: ViewService
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(async (user) => {
      if (!user) {
        const popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to view history' },
        });
        await popover.present();
      }
    });

    if (!this.viewed) {
      this.viewService.viewItems('history');
      this.viewed = true;
    }
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-his');
    this.menu.open('menu-content-his');
  }
  ionViewWillEnter() {
    const sessions$ = this.workoutService.getWorkouts();
    const categories$ = this.categoryService.getCategories();

    this.subscription = combineLatest([sessions$, categories$]).subscribe(
      ([sessions, categories]) => {
        this.sessions = sessions;

        const groups = groupBy(this.sessions, (session) =>
          moment(session.timestamp).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY',
          })
        );

        this.sessionGroups = [];
        for (const key in groups) {
          if (groups.hasOwnProperty(key)) {
            this.sessionGroups.push({
              date: key,
              sessions: groups[key],
            });
          }
        }
      }
    );
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  onDelete(workout) {
    this.workoutService.deleteWorkout(workout);
  }
}
