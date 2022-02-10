/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ModalController } from '@ionic/angular';
import { ExerciseFilterComponent } from './components/exercise-filter/exercise-filter.component';
import { CategoryService } from '../../services/category.service';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ViewService } from '../../services/view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit, OnDestroy {
  categories: any[];
  exercises: any[];
  segment: string;
  queryText: string;
  viewed = false;

  subscription: Subscription;
  search$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private exerciseService: ExerciseService,
    private viewService: ViewService,
    private categoryService: CategoryService,
    private router: Router,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.exerciseService.getExercises(),
      this.categoryService.getCategories(),
      this.search$,
    ]).subscribe(([exercises, categories, search]) => {
      if (search && search.trim()) {
        this.exercises = exercises.filter((ex) =>
          ex.name.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.exercises = exercises;
      }

      this.categories = categories;
      if (!this.viewed) {
        this.viewService.viewItems('exercises');
        this.viewed = true;
      }
    });
  }

  onSearch(query) {
    this.search$.next(query);
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

  goToDetailPage(id: string) {
    this.router.navigate(['/app/tabs/exercises/exercise', id]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
