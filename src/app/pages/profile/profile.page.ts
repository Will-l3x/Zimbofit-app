/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { LikeService } from '../../services/like.service';
import { take } from 'rxjs/operators';
import { OfflineService } from '../../services/offline.service';
import { MenuController, PopoverController } from '@ionic/angular';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  user: any;
  likes: any;
  segment = 'info';
  reviews_segment = 'likes';
  top_segment = 'info-tab';
  offline = true;
  tab = 'Basic Info';
  subscription: Subscription;
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
  page = 'Profile';
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private likeService: LikeService,
    private offlineService: OfflineService,
    private menu: MenuController,
    private popoverCtrl: PopoverController,
    private router: Router
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    const user$ = this.userService.getCurrentUser();
    const categories$ = this.categoryService.getCategories();
    const likes$ = this.userService.getLikes();
    const offline$ = this.offlineService.isOffline();

    this.subscription = combineLatest([
      user$,
      categories$,
      likes$,
      offline$,
    ]).subscribe(async ([user, categories, likes, offline]) => {
      this.user = user;

      if (!user) {
        const popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to view profile' },
        });
        await popover.present();
      }

      if (user && user.goals) {
        this.user.categories = user.goals.map((goal) =>
          categories.find((cat) => cat.id === goal)
        );
      }

      this.likes = likes;

      this.offline = offline;
    });
  }

  tabRoute(tab) {
    this.tab = tab;
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-prof');
    this.menu.open('menu-content-prof');
  }
  deleteLike(like) {
    this.likeService.deleteLike(like);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
