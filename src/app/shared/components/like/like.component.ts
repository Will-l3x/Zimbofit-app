import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';

import { LikeService } from '../../../services/like.service';
import { UserService } from '../../../services/user.service';
import { LoginPopoverComponent } from '../login-popover/login-popover.component';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit, OnDestroy {
  @Input() targetId: string;
  @Input() targetType: string;
  @Input() targetName: string;
  @Input() color: string;

  @Input() small = false;
  likes = [];
  like;
  subscription: Subscription;

  constructor(private likeService: LikeService,
    private popoverCtrl: PopoverController,
    private userService: UserService) { }

  ngOnInit() {
    this.subscription = combineLatest([
      this.likeService.getLikesOn(this.targetId),
      this.userService.getLikeOn(this.targetId)
    ]).subscribe(([likes, like]) => {
      this.likes = likes;
      this.like = like;
      // console.log(likes);
    });
  }

  onLike() {
    this.userService.getCurrentUser().subscribe(async user => {
      if (!user) {
        const popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to like this' }
        });
        await popover.present();
      } else {
        this.userService.onLike(this.targetId, this.targetType, this.targetName);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
