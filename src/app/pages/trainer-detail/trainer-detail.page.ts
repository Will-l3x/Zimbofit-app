/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainerService } from '../../services/trainer.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';import { UserService } from '../../services/user.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'trainer-detail',
  templateUrl: './trainer-detail.page.html',
  styleUrls: ['./trainer-detail.page.scss'],
})
export class TrainerDetailPage implements OnInit, OnDestroy {
  offline = true;
  subscription: Subscription;
  trainer;
  viewed = false;
  page = 'Trainer Details';
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
    private route: ActivatedRoute,
    private offlineService: OfflineService,
    private userService: UserService,
    private viewService: ViewService,
    private trainerService: TrainerService
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('trainerId');
    this.subscription = combineLatest([
      this.trainerService.getTrainer(id),
      this.offlineService.isOffline(),
    ]).subscribe(([trainer, offline]) => {
      this.trainer = trainer;
      this.offline = offline;
      if (!this.viewed) {
        this.viewService.viewItem(trainer.name, trainer.id, 'trainer');
        this.viewed = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
