import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TrainerService } from '../../services/trainer.service';
import { Chart } from 'chartjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [CategoryService, TrainerService],
})
export class DashboardPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;
  categories;
  trainers;
  lineChart: Chart;
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
    selected.classList.remove('text-orange-600');
    selected.classList.add('bg-orange-600', 'text-white');
  }
  ngAfterViewInit(): void {
    const chartOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: false,
            scaleLabel: false,
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: false,
            scaleLabel: false,
            ticks: {
              display: false,
              suggestedMin: 0,
              suggestedMax: 10,
            },
          },
        ],
      },
    };
    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: 'line',
    //   data: {
    //     labels: [2, 3, 2, 9, 7, 7, 4],
    //     datasets: [
    //       {
    //         backgroundColor: 'rgba(246, 109, 155, 0.1)',
    //         borderColor: 'rgba(246, 109, 155, 0.8)',
    //         borderWidth: 2,
    //         data: [2, 3, 2, 9, 7, 7, 4],
    //       },
    //     ],
    //   },
    //   options: chartOptions,
    // });
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
