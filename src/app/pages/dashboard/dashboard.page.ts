import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TrainerService } from '../../services/trainer.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [CategoryService, TrainerService],
})
export class DashboardPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;
  @ViewChild('lineWeight', { static: false }) lineWeight: ElementRef;
  categories;
  trainers;
  chartOptions;
  lineChart: Chart;
  lineChartWeight: Chart;

  constructor(
    public categoryService: CategoryService,
    public trainerService: TrainerService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });

    this.trainerService.getTrainers().subscribe((res) => {
      console.log(res);
      this.trainers = res;
    });

    const selected = document.querySelector('.selected');
    const bar = document.getElementById('bar');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    const bar4 = document.getElementById('bar4');
    bar.classList.remove('w-0');
    bar.classList.add('w-full');
    bar2.classList.remove('w-0');
    bar2.classList.add('w-full');
    bar3.classList.remove('w-0');
    bar3.classList.add('w-3/5');
    bar4.classList.remove('w-0');
    bar4.classList.add('w-3/5');
    selected.classList.remove('text-orange-600');
    selected.classList.add(
      'from-orange-600',
      'to-orange-500',
      'bg-gradient-to-r',
      'text-white'
    );
  }
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
    this.lineChartWeight = new Chart(this.lineWeight.nativeElement, {
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
              color: '#f8fafc',
              tickColor: '#f8fafc',
            },
            ticks: {
              color: '#f8fafc',
            },
          },
          yAxes: {
            display: false,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            fill: false,
            tension: 0.5,
            pointHoverBorderWidth: 2,
            backgroundColor: '#f8fafc',
            borderColor: '#f8fafc',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#f8fafc',
            pointBackgroundColor: '#f8fafc',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#f8fafc',
            pointHoverBorderColor: '#f8fafc',
            pointRadius: 1,
            pointHitRadius: 10,
            data: [64, 64, 63, 61, 60, 58, 55],
            spanGaps: false,
          },
        ],
      },
    });
  }

  toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
  };
  toggleSubMenu = () => {
    const menu = document.getElementById('mobile-sub-menu');
    menu.classList.toggle('hidden');
  };
}
