import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;
  @ViewChild('lineWeight', { static: false }) lineWeight: ElementRef;
  categories;
  trainers;
  user: any;
  chartOptions;
  lineChart: Chart;
  lineChartWeight: Chart;
  page = 'Dashboard';
  appPages = [
    {
      title: 'Dashboard',
      url: '/app/tabs/dashboard',
      icon: 'home',
    },
    {
      title: 'Start',
      url: '/app/tabs/start',
      icon: 'play',
      requiresUser: true,
    },
    {
      title: 'Programs',
      url: '/app/tabs/programs',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Trainers',
      url: '/app/tabs/trainers',
      icon: 'unlock',
      count: 0,
    },

    {
      title: 'Schedules',
      url: '/app/tabs/schedule',
      icon: 'calendar',
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'contacts',
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
    },
  ];
  constructor(
    public categoryService: CategoryService,
    public trainerService: TrainerService,
    private userService: UserService,
    private menu: MenuController
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });

    this.trainerService.getTrainers().subscribe((res) => {
      console.log(res);
      this.trainers = res;
    });

    const bar = document.getElementById('bar');
    const bar3 = document.getElementById('bar3');
    bar.classList.remove('w-0');
    bar.classList.add('w-full');
    bar3.classList.remove('w-0');
    bar3.classList.add('w-3/5');
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
            data: [64.7, 64.1, 63.0, 61.3, 60.0, 58.1, 55.5],
            spanGaps: false,
          },
        ],
      },
    });
  }

  sidenavOpen() {
    this.menu.enable(true, 'menu-content=dash');
    this.menu.open('menu-content-dash');
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
