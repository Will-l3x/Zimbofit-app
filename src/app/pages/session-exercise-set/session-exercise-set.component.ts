import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { SessionExerciseSetAdjustComponent } from '../session-exercise-set-adjust/session-exercise-set-adjust.component';

@Component({
  selector: 'session-exercise-set',
  templateUrl: './session-exercise-set.component.html',
  styleUrls: ['./session-exercise-set.component.scss'],
})
export class SessionExerciseSetComponent implements OnInit {

  @Input() set: any;
  @Output() adjust = new EventEmitter();
  @Output() complete = new EventEmitter();

  measurements: any;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.measurements = this.set.measurements.map(measurement => {
      measurement.value = measurement.value ? measurement.value : measurement.default;
      return {
        ...measurement,
        value: measurement.value ? measurement.value : measurement.default
      };
    });
  }

  onSetComplete() {
    this.complete.emit({
      set: this.set,
      measurements: this.measurements
    });
  }

  async onSetAdjust() {
    const popover = await this.popoverController.create({
      component: SessionExerciseSetAdjustComponent,
      componentProps: { set: this.set },
    });

    popover.present();

    const { data } = await popover.onWillDismiss();
    if (data.set && data.measurements) {
      this.adjust.emit({
        set: data.set,
        measurements: data.measurements
      });

      this.measurements = data.measurements;
    }
  }

}
