import { Component, OnInit } from "@angular/core";
import { Subscription, combineLatest } from "rxjs";
import { SettingsService } from "../../../services/settings.service";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "category-filter",
  templateUrl: "./category-filter.component.html",
  styleUrls: ["./category-filter.component.scss"],
})
export class CategoryFilterComponent implements OnInit {
  categories = [];
  muscles = [];

  subscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const muscleGroups$ = this.settingsService.muscles;
    const categories$ = this.settingsService.categories;

    this.subscription = combineLatest([muscleGroups$, categories$]).subscribe(
      ([muscles, categories]) => {
        this.muscles = muscles;
        this.categories = categories;
      }
    );
  }

  selectAll(check: boolean) {
    // set all to checked or unchecked
    this.categories.forEach((cat) => {
      cat.isChecked = check;
    });

    this.muscles.forEach((muscle) => {
      muscle.isChecked = check;
    });
  }

  applyFilters() {
    this.settingsService.setCategories(this.categories);
    this.settingsService.setMuscles(this.muscles);
    this.dismiss();
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
