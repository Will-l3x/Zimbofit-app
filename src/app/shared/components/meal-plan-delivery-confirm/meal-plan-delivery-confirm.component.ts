import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'meal-plan-delivery-confirm',
  templateUrl: './meal-plan-delivery-confirm.component.html',
  styleUrls: ['./meal-plan-delivery-confirm.component.scss'],
})
export class MealPlanDeliveryConfirmComponent implements OnInit {

  @Input() rating: number;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onConfirm() {
    this.popoverController.dismiss(this.rating);
  }

}
