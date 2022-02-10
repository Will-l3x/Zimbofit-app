import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Subscription, combineLatest } from 'rxjs';
import { OfflineService } from '../../../../services/offline.service';

@Component({
  selector: 'app-workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.scss'],
})
export class WorkoutListItemComponent implements OnInit, OnDestroy {
  @Input() workout: any;
  @Input() priceTag = true;
  @Output() clicked = new EventEmitter();
  collapsed = false;
  exercises = [];
  imageUrl = 'assets/img/placeholder.png';
  mine = false;
  offline = true;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private offlineService: OfflineService
  ) {}

  ngOnInit() {
    this.imageUrl = this.workout.image_url
      ? this.workout.image_url
      : 'assets/img/products/advance-card-jp.jpg';
    this.subscription = combineLatest([
      this.userService.getCurrentUser(),
      this.offlineService.isOffline(),
    ]).subscribe(([user, offline]) => {
      this.mine = user ? this.workout.user_id === user.id : false;
      this.offline = offline;
    });
    console.log(this.priceTag);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
