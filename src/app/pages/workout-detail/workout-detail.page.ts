/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { WorkoutEditSchedulePage } from '../workout-edit-schedule/workout-edit-schedule.page';
import { UserService } from '../../services/user.service';
import { TrainerService } from '../../services/trainer.service';
import { combineLatest, Subscription } from 'rxjs';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';
import { PurchaseItem } from '../../interfaces/purchase-item';

@Component({
  selector: 'workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
})
export class WorkoutDetailPage implements OnInit, OnDestroy {
  workout: any;
  offline = true;
  viewed = false;
  hover$ = { id: '', active: false };

  subscription: Subscription;

  purchase: PurchaseItem;
  mealPlanPurchase: PurchaseItem;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private viewService: ViewService,
    private userService: UserService,
    private offlineService: OfflineService,
    private trainerService: TrainerService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('workoutId');
    this.subscription = combineLatest([
      this.workoutService.getWorkout(id),
      this.trainerService.getTrainers(),
      this.userService.getUsers(),
      this.userService.getCurrentUser(),
      this.offlineService.isOffline(),
    ]).subscribe(([workout, trainers, users, user, offline]) => {
      this.workout = workout;
      if (workout.trainer_id) {
        this.workout.trainer = trainers.find(
          (t) => t.id === workout.trainer_id
        );
      }
      if (workout.user_id) {
        this.workout.user = users.find((u) => u.id === workout.user_id);
      }
      this.offline = offline;

      this.purchase = {
        id: `workout_${this.workout.id}_user_${user.id}`,
        item_id: this.workout.id,
        name: this.workout.name,
        type: 'workout',
        price: +this.workout.price,
        user_id: user.id,
        user_name: user.name,
        timestamp: new Date().getTime(),
      };

      this.mealPlanPurchase = {
        id: `meal_plan_${this.workout.id}_user_${user.id}`,
        user_id: user.id,
        user_name: user.name,
        item_id: this.workout.id,
        type: 'workout',
        subtype: 'meal_plan',
        name: `${this.workout.name} Meal Plan`,
        price: this.workout.meal_plan_price,
        timestamp: new Date().getTime(),
      };

      if (!this.viewed) {
        this.viewService.viewItem(workout.name, workout.id, 'workout');
        this.viewed = true;
      }
    });
  }

  async onSchedule() {
    const modal = await this.modalController.create({
      component: WorkoutEditSchedulePage,
      componentProps: { workout: this.workout },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }
  goToDetailPage(exercise) {
    this.router.navigate(['/app/tabs/exercises/exercise', exercise.id], {
      state: { exercise },
    });
  }
  hover(id) {
    this.hover$ = { id, active: this.hover$.active === true ? false : true };
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
