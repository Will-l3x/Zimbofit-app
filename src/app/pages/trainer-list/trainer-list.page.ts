/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainerService } from '../../services/trainer.service';
import { Subscription, combineLatest } from 'rxjs';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';
import { MenuController } from '@ionic/angular';import { UserService } from '../../services/user.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'trainer-list',
  templateUrl: './trainer-list.page.html',
  styleUrls: ['./trainer-list.page.scss'],
})
export class TrainerListPage implements OnInit, OnDestroy {
  subscription: Subscription;
  offline = true;
  hover$ = { id: '', active: false };
  trainers: any[];
  viewed = false;
  page = 'Trainers';
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
  user;
  constructor(
    private trainerService: TrainerService,
    private menu: MenuController,
    private viewService: ViewService,
    private offlineService: OfflineService,
    private userService: UserService
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    this.subscription = combineLatest([
      this.trainerService.getTrainers(),
      this.offlineService.isOffline(),
    ]).subscribe(([trainers, offline]) => {
      this.trainers = trainers;
      this.offline = offline;

      if (!this.viewed) {
        this.viewService.viewItems('trainers');
        this.viewed = true;
      }
    });
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-tra-li');
    this.menu.open('menu-content-tra-li');
  }
  hover(id) {
    this.hover$ = { id, active: this.hover$.active === true ? false : true };
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
