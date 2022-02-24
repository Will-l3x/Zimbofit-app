/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import {
  MenuController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';
import { take } from 'rxjs/operators';
@Component({
  selector: 'workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit, OnDestroy {
  segment = 'all';
  queryText: string;
  myWorkouts: any[];
  subscription: Subscription;
  page = 'Workouts';
  appPages = [
    {
      title: 'Dashboard',
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
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private router: Router,
    public modalCtrl: ModalController
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    this.userService
      .getAuthoredWorkouts()
      .subscribe((myWorkouts) => (this.myWorkouts = myWorkouts));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-work');
    this.menu.open('menu-content-work');
  }
  updateList() {}

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: CategoryFilterComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
    }
  }

  onAddWorkout() {
    this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(async (user) => {
        if (!user) {
          const popover = await this.popoverCtrl.create({
            component: LoginPopoverComponent,
            componentProps: { title: 'Please login to add workouts' },
          });
          await popover.present();
        } else {
          this.router.navigateByUrl('/app/tabs/workouts/workout/create');
        }
      });
  }
}
