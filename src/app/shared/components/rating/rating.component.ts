import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RatingService } from '../../../services/rating.service';
import { combineLatest, Subscription } from 'rxjs';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { RatingEditComponent } from '../rating-edit/rating-edit.component';
import { LoginPopoverComponent } from '../login-popover/login-popover.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnDestroy {
  @Input() targetId: string;
  @Input() targetType: string;
  @Input() targetName: string;
  @Input() small = false;
  @Input() color: string;
  ratings = [];
  rating;
  rate;
  average = 0;
  overall_rate: number;

  subscription: Subscription;

  constructor(private userService: UserService,
    private ratingService: RatingService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.subscription = combineLatest([
      this.ratingService.getRatingsOn(this.targetId),
      this.userService.getRatingOn(this.targetId)
    ]).subscribe(([ratings, rating]) => {
      this.ratings = ratings;
      if (ratings.length > 0) {
        let sum = 0;
        this.ratings.forEach(rtn => {
          sum += rtn.rate;
        });
        this.average = Math.fround(sum / this.ratings.length);
      }

      if (rating) {
        this.rating = rating;
        this.rate = rating.rate;
      }
    });
  }

  onRating() {

    this.userService.onRating(this.targetId, this.targetType, this.targetName, this.rate);
  }

  onRateChange(event) {
    // console.log(event);
  }

  async openRating() {

    this.userService.getCurrentUser().subscribe(async user => {
      if (!user) {
        const popover = await this.popoverController.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to rate this' }
        });
        await popover.present();
      } else {
        const modal = await this.popoverController.create({
          component: RatingEditComponent,
          componentProps: { rate: this.rate }
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
          this.rate = data;
          this.onRating();
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
