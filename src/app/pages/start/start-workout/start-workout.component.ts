import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'start-workout',
  templateUrl: './start-workout.component.html',
  styleUrls: ['./start-workout.component.scss'],
})
export class StartWorkoutComponent implements OnInit {
  workout;

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.workout = this.navParams.get('workout');
    console.log(this.workout);
  }

  onClick() {
    this.popoverController.dismiss();
  }

}
