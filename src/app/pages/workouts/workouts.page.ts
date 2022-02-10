/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginPopoverComponent } from '../../shared/components/login-popover/login-popover.component';
import { take, switchMap } from 'rxjs/operators';
import { UserWorkoutService } from '../../services/user-workout.service';

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

  constructor(private userService: UserService,
    private popoverCtrl: PopoverController,
    private router: Router,
    private userWorkoutService: UserWorkoutService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.userService.getAuthoredWorkouts().subscribe(myWorkouts => this.myWorkouts = myWorkouts);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateList() { }

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
    this.userService.getCurrentUser().pipe(take(1)).subscribe(async user => {
      if (!user) {
        const popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to add workouts' }
        });
        await popover.present();
      } else {
        this.router.navigateByUrl('/app/tabs/workouts/workout/create');
      }
    });
  }
}
