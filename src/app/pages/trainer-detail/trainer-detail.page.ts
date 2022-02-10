import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainerService } from '../../services/trainer.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';

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

  constructor(private route: ActivatedRoute,
    private offlineService: OfflineService,
    private viewService: ViewService,
    private trainerService: TrainerService) { }

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
    if(this.subscription) this.subscription.unsubscribe();
  }
}
