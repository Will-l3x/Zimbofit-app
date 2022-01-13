import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'rating-edit',
  templateUrl: './rating-edit.component.html',
  styleUrls: ['./rating-edit.component.scss'],
})
export class RatingEditComponent implements OnInit {
  @Input() rate;

  constructor(private popoverController: PopoverController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.rate = this.navParams.get('rate');
  }

  onRateChange(event) {
    this.popoverController.dismiss(event);
  }
}
