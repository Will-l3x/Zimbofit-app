/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { OfflineService } from '../../../../services/offline.service';

@Component({
  selector: 'app-program-list-item',
  templateUrl: './program-list-item.component.html',
  styleUrls: ['./program-list-item.component.scss'],
})
export class ProgramListItemComponent implements OnInit, OnDestroy {
  @Input() program: any;
  @Output() clicked = new EventEmitter();
  offline = true;
  subscription: Subscription;

  constructor(private offlineService: OfflineService) {}

  ngOnInit() {
    this.subscription = this.offlineService.isOffline().subscribe((offline) => {
      this.offline = offline;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
