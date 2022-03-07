/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import {
  MenuController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit, OnDestroy {
  programs: any[];
  segment = 'all';
  queryText: string;
  myPrograms: any;
  subscription: Subscription;
  page = 'Programs';
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
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private router: Router,
    public modalCtrl: ModalController
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    this.subscription = this.userService
      .getAuthoredPrograms()
      .subscribe((programs) => {
        this.myPrograms = programs;
      });
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-prog');
    this.menu.open('menu-content-prog');
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

  onAddProgram() {
    this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(async (user) => {
        if (!user) {
          const popover = await this.popoverCtrl.create({
            component: LoginPopoverComponent,
            componentProps: { title: 'Please login to add programs' },
          });
          await popover.present();
        } else {
          this.router.navigateByUrl('/app/tabs/workouts/workout/create');
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
