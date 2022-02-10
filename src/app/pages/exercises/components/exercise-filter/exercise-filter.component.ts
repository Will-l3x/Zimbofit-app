import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'exercise-filter',
  templateUrl: './exercise-filter.component.html',
  styleUrls: ['./exercise-filter.component.scss'],
})
export class ExerciseFilterComponent implements OnInit, OnDestroy {
  categories;
  muscles;

  subscription: Subscription;

  constructor(private settingsService: SettingsService,
    public navParams: NavParams,
    public modalCtrl: ModalController,) { }

  ngOnInit() {

    const muscleGroups$ = this.settingsService.muscles;
    const categories$ = this.settingsService.categories;

    this.subscription = combineLatest(muscleGroups$, categories$).subscribe(([muscles, categories]) => {
      this.muscles = muscles;
      this.categories = categories;
    });
  }

  selectAll(check: boolean) {
    // set all to checked or unchecked
    this.categories.forEach(cat => {
      cat.isChecked = check;
    });

    this.muscles.forEach(muscle => {
      muscle.isChecked = check;
    });
  }

  applyFilters() {
    this.settingsService.setCategories(this.categories);
    this.settingsService.setMuscles(this.muscles);
    this.dismiss();
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }
}
