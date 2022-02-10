import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Session } from '../../../interfaces/session';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import capitalize from 'lodash/capitalize';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss'],
})
export class WorkoutChartComponent implements AfterViewInit, OnChanges {

  @Input() session_exercises: any;

  @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;

  public mainChartData: Array<any>;
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any>;
  /* tslint:enable:max-line-length */

  private lineChart: Chart;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.constructGraph();
  }

  ngAfterViewInit(): void {
    this.constructGraph();
  }

  constructGraph() {
    if (!this.lineCanvas || !this.session_exercises) { return; }

    this.mainChartLabels = orderBy(this.session_exercises, 'timestamp').map(exercise => moment(exercise.timestamp).format('DD/MM HH:mm'));
    const measurements = [];
    this.session_exercises.forEach(exercise => {
      exercise.measurements.forEach(measurement => {
        measurement.timestamp = exercise.timestamp;
        measurements.push(measurement);
      });
    });

    this.mainChartData = [];
    const groupedMeasurements = groupBy(measurements, 'name');
    for (const name in groupedMeasurements) {
      if (groupedMeasurements.hasOwnProperty(name)) {
        const namedMeasurements = orderBy(groupedMeasurements[name], 'timestamp');
        this.mainChartData.push({
          label: capitalize(name),
          data: namedMeasurements.map(nm => nm.value)
        });
      }
    }

    console.log(measurements);
    console.log(this.mainChartData);
    console.log(this.mainChartLabels);

    const data = {
      labels: this.mainChartLabels,
      datasets: this.mainChartData
    };
    console.log(data);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data
    });
  }

  getColors(measure) {
    switch (measure.name) {
      case 'reps': {
        return ['rgba(192,192,75,0.4)', 'rgba(192,192,75,1)',];
      }
      case 'time': {
        return ['rgba(192,75,192,0.4)', 'rgba(192,75,192,1)',];
      }
      case 'weight': {
        return ['rgba(75,192,192,0.4)', 'rgba(75,192,192,1)',];
      }
      case 'workload': {
        return ['rgba(75,192,192,0.4)', 'rgba(75,192,192,1)',];
      }
      case 'distance': {
        return ['rgba(75,75,192,0.4)', 'rgba(75,75,192,1)',];
      }
    }
  }
}
