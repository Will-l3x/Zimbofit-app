/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { combineLatest, Subscription } from 'rxjs';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';
import { PurchaseItem } from '../../interfaces/purchase-item';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'program-detail',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
})
export class ProgramDetailPage implements OnInit, OnDestroy {
  program;
  subscription: Subscription;
  offline = true;
  hover$ = { id: '', active: false };
  viewed = false;
  purchase: PurchaseItem;
  mealPlanPurchase: PurchaseItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offlineService: OfflineService,
    private userService: UserService,
    private viewService: ViewService,
    private programService: ProgramService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('programId');
    this.subscription = combineLatest([
      this.programService.getProgram(id),
      this.offlineService.isOffline(),
      this.userService.getCurrentUser(),
    ]).subscribe(([program, offline, user]) => {
      this.program = program;
      this.offline = offline;

      this.purchase = {
        id: `program_${this.program.id}_user_${user.id}`,
        name: this.program.name,
        type: 'program',
        item_id: this.program.id,
        price: +this.program.price,
        user_id: user.id,
        user_name: user.name,
        timestamp: new Date().getTime(),
      };

      this.mealPlanPurchase = {
        id: `meal_plan_${this.program.id}_user_${user.id}`,
        user_id: user.id,
        user_name: user.name,
        item_id: this.program.id,
        type: 'program',
        subtype: 'meal_plan',
        name: `${this.program.name} Meal Plan`,
        price: this.program.meal_plan_price,
        timestamp: new Date().getTime(),
      };
      if (!this.viewed) {
        this.viewService.viewItem(program.name, program.id, 'program');
        this.viewed = true;
      }
    });
  }
  hover(id) {
    this.hover$ = { id, active: this.hover$.active === true ? false : true };
  }
  gotoWorkoutPageDetail(workout) {
    this.router.navigate(['/app/tabs/workouts/workout'], workout.id);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
