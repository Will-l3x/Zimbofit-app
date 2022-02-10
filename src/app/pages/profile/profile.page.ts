import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { LikeService } from '../../services/like.service';
import { take } from 'rxjs/operators';
import { OfflineService } from '../../services/offline.service';
import { PopoverController } from '@ionic/angular';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';


@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  likes: any;
  segment = 'info';
  reviews_segment = 'likes';
  top_segment = 'info-tab';
  offline = true;

  subscription: Subscription;

  constructor(private userService: UserService,
    private categoryService: CategoryService,
    private likeService: LikeService,
    private offlineService: OfflineService,
    private popoverCtrl: PopoverController,
    private router: Router) { }

  ngOnInit() {
    const user$ = this.userService.getCurrentUser();
    const categories$ = this.categoryService.getCategories();
    const likes$ = this.userService.getLikes();
    const offline$ = this.offlineService.isOffline();

    this.subscription = combineLatest([user$, categories$, likes$, offline$])
      .subscribe(async ([user, categories, likes, offline]) => {
        this.user = user;

        if (!user) {
          const popover = await this.popoverCtrl.create({
            component: LoginPopoverComponent,
            componentProps: { title: 'Please login to view profile' }
          });
          await popover.present();
        }

        if (user && user.goals) {
          this.user.categories = user.goals.map(goal => {
            return categories.find(cat => cat.id === goal);
          });
        }

        this.likes = likes;

        this.offline = offline;
      });
  }

  deleteLike(like) {
    this.likeService.deleteLike(like);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
