import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import groupBy from 'lodash-es/groupBy';

import { Session } from '../../../interfaces/session';

@Component({
  selector: 'app-exercise-history',
  templateUrl: './exercise-history.component.html',
  styleUrls: ['./exercise-history.component.scss'],
})
export class ExerciseHistoryComponent implements OnChanges {
  @Input() sessions: Session[];
  @Input() exercise: any;

  public exercises: any[];

  constructor() { }

  ngOnChanges() {
    if (this.sessions) {
      this.exercises = this.sessions.map(s => {
        const exercise = s.session_exercises.find(ex => ex.exercise_id === this.exercise.id);
        exercise.timestamp = s.timestamp;

        exercise.sets = exercise.sets.map((set: any) => {
          const weightMeasurement = set.measurements.find(measurement => measurement.name === 'weight');
          const repsMeasurement = set.measurements.find(measurement => measurement.name === 'reps');

          if (weightMeasurement && repsMeasurement) {
            const weight = weightMeasurement.value;
            const reps = repsMeasurement.value;

            set.measurements.push({
              name: 'workload',
              unit: 'W',
              value: weight * reps
            });
          }
          return set;
        });

        const measurements = [];
        exercise.sets.forEach(set => {
          set.measurements.forEach(measurement => {
            measurements.push(measurement);
          });
        });

        exercise.measurements = [];
        const groupedMeasurements = groupBy(measurements, 'name');
        for (const name in groupedMeasurements) {
          if (groupedMeasurements.hasOwnProperty(name)) {
            exercise.measurements.push({
              name,
              unit: groupedMeasurements[name][0].unit,
              value: groupedMeasurements[name].reduce((accumulator, currentValue) => accumulator + currentValue.value, 0),
              default: groupedMeasurements[name].reduce((accumulator, currentValue) => accumulator + currentValue.default, 0),
            });
          }
        }
        return exercise;
      });

      console.log(this.exercises);
    }
  }
}
