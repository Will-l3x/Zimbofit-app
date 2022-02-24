/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { WorkoutService } from '../../services/workout.service';
import { combineLatest, Subscription } from 'rxjs';
import { ViewService } from '../../services/view.service';
import { MenuController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit, OnDestroy {
  public categories: any[];
  subscription: Subscription;
  viewed = false;
  page = 'Categories';
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
    private categoryService: CategoryService,
    private menu: MenuController,
    private workoutService: WorkoutService,
    private viewService: ViewService,
    private userService: UserService
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    const categories$ = this.categoryService.getCategories();
    const workouts$ = this.workoutService.getWorkouts();

    this.subscription = combineLatest([categories$, workouts$]).subscribe(
      ([categories, workouts]) => {
        this.categories = categories.map((cat) => {
          cat.workouts = workouts.filter((w) => w.category_id === cat.id);
          return cat;
        });

        if (!this.viewed) {
          this.viewService.viewItems('category-list-page');
          this.viewed = true;
        }
      }
    );
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-cat');
    this.menu.open('menu-content-cat');
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
