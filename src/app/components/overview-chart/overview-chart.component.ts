import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss'],
})
export class OverviewChartComponent implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;
  lineChart: Chart;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          xAxes: {
            grid: {
              display: false,
              borderColor: 'rgba(0, 0, 0, 0)',
              color: '#fed7aa',
              tickColor: '#fed7aa',
            },
            ticks: {
              color: '#fed7aa',
            },
          },
          yAxes: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            fill: false,
            tension: 0.5,
            backgroundColor: '#fed7aa',
            borderColor: '#fed7aa',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#fed7aa',
            pointBackgroundColor: '#f8fafc',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fed7aa',
            pointHoverBorderColor: '#fed7aa',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 54, 26, 55, 40, 80, 54, 26, 55, 40],
            spanGaps: false,
          },
        ],
      },
    });
  }
}
