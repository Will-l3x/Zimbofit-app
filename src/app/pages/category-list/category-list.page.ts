import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { WorkoutService } from '../../services/workout.service';
import { combineLatest, Subscription } from 'rxjs';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit, OnDestroy {
  public categories: any[];
  subscription: Subscription;
  viewed = false;

  constructor(private categoryService: CategoryService,
    private workoutService: WorkoutService,
    private viewService: ViewService) { }

  ngOnInit() {
    const categories$ = this.categoryService.getCategories();
    const workouts$ = this.workoutService.getWorkouts();

    this.subscription = combineLatest([categories$, workouts$]).subscribe(([categories, workouts]) => {
      this.categories = categories.map(cat => {
        cat.workouts = workouts.filter(w => w.category_id === cat.id);
        return cat;
      });

      if (!this.viewed) {
        this.viewService.viewItems('category-list-page');
        this.viewed = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
