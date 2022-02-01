import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;
  lineChart: Chart;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: 'line',
    //   data: {
    //     labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
    //     datasets: [
    //       {
    //         label: 'Data',
    //         backgroundColor: '#fed7aa',
    //         borderColor: '#fed7aa',
    //         pointBorderColor: '#fed7aa',
    //         pointBackgroundColor: '#f8fafc',
    //         pointHoverBackgroundColor: '#fed7aa',
    //         pointHoverBorderColor: '#fed7aa',
    //         pointBorderWidth: 0,
    //         pointHoverRadius: 0,
    //         pointHoverBorderWidth: 1,
    //         pointRadius: 1,
    //         fill: false,
    //         borderWidth: 4,
    //         data: [200, 150, 110, 170, 50, 100, 40],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //     scales: {
    //       xAxes: {
    //         grid: {
    //           display: false,
    //           borderColor: 'rgba(0, 0, 0, 0)',
    //           color: '#fed7aa',
    //           tickColor: '#fed7aa',
    //         },
    //         ticks: {
    //           color: '#fed7aa',
    //         },
    //       },
    //       yAxes: {
    //         display: false,
    //         grid: {
    //           display: false,
    //         },
    //       },
    //     },
    //     elements: {
    //       line: {
    //         borderWidth: 2,
    //       },
    //     },
    //   },
    // });
  }
}
