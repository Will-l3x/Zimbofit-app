import { Component, OnInit } from '@angular/core';
import groupBy from 'lodash/groupBy';
import * as moment from 'moment';
import { combineLatest, Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { ViewService } from '../../services/view.service';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';
import { WorkoutSessionService } from '../../services/workout-session.service';

@Component({
  selector: 'history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  sessions: any[];
  sessionGroups: any[] = [];
  subscription: Subscription;
  viewed = false;

  constructor(private workoutService: WorkoutSessionService,
    private userService: UserService,
    private categoryService: CategoryService,
    private popoverCtrl: PopoverController,
    private viewService: ViewService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(async user => {
      if (!user) {
        const popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to view history' }
        });
        await popover.present();
      }
    });

    if (!this.viewed) {
      this.viewService.viewItems('history');
      this.viewed = true;
    }
  }

  ionViewWillEnter() {
    const sessions$ = this.workoutService.getWorkouts();
    const categories$ = this.categoryService.getCategories();

    this.subscription = combineLatest([sessions$, categories$]).subscribe(([sessions, categories]) => {
      this.sessions = sessions;

      const groups = groupBy(this.sessions, session => {
        return moment(session.timestamp).calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY'
      });
      });

      this.sessionGroups = [];
      for (const key in groups) {
        if (groups.hasOwnProperty(key)) {
          this.sessionGroups.push({
            date: key,
            sessions: groups[key]
          });
        }
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  onDelete(workout) {
    this.workoutService.deleteWorkout(workout);
  }
}
