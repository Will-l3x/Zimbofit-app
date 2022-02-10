import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'session-exercise-set-adjust',
  templateUrl: './session-exercise-set-adjust.component.html',
  styleUrls: ['./session-exercise-set-adjust.component.scss'],
})
export class SessionExerciseSetAdjustComponent implements OnInit {

  @Input() set: any;
  measurements: any;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.measurements = this.set.measurements.map(measurement => ({...measurement}));
  }

  increase(measurement) {
    if (measurement.value < measurement.default) {
      measurement.value++;
    }
  }

  decrease(measurement) {
    if (measurement.value > 0) { measurement.value--; }
  }

  onDismiss() {
    this.popoverController.dismiss({
      set: this.set,
      measurements: this.measurements,
    });
  }

}
