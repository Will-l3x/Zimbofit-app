/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainerService } from '../../services/trainer.service';
import { Subscription, combineLatest } from 'rxjs';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';

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

  constructor(
    private trainerService: TrainerService,
    private viewService: ViewService,
    private offlineService: OfflineService
  ) {}

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
  hover(id) {
    this.hover$ = { id, active: this.hover$.active === true ? false : true };
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
