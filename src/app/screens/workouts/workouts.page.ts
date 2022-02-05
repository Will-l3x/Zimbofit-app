/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { Category } from 'src/app/interfaces/category.model';
import { Workout } from 'src/app/interfaces/workout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {
  categories$: Category[] = [];
  workouts$: Workout[] = [];
  activecat =  {
          description: 'all',
          id: 'all',
          image_url: 'assets/img/home/exercise.svg',
          name: 'All',
          timestamp: parseInt(Date.now().toFixed(), 10),
          date_time: parseInt(Date.now().toFixed(), 10),
        };
  constructor(
    private categoryService: CategoryService,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  acronym(text) {
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories$ = [
        {
          description: 'all',
          id: 'all',
          image_url: 'assets/img/home/exercise.svg',
          name: 'All',
          timestamp: parseInt(Date.now().toFixed(), 10),
          date_time: parseInt(Date.now().toFixed(), 10),
        },
      ];
      const categories = [];
      for (const category of res) {
        category.active = false;
        category.name =
          category.name.length >= 32
            ? this.acronym(category.name)
            : category.name;
        category.image_url = 'assets/img/home/programs.svg';
        categories.push(category);
      }
      this.categories$ = this.categories$.concat(categories);
      console.log(categories);
    });
    this.getWorkouts();
  }
  getWorkouts() {
    this.workoutService.getWorkouts2().subscribe((res) => {
      this.activecat = {
        description: 'all',
        id: 'all',
        image_url: 'assets/img/home/exercise.svg',
        name: 'All',
        timestamp: parseInt(Date.now().toFixed(), 10),
        date_time: parseInt(Date.now().toFixed(), 10),
      };
      this.workouts$ = res;
    });
  }
  searchCat(item) {
    if (item.id === 'all') {
      this.getWorkouts();
    } else {
      this.workoutService.getWorkouts2().subscribe((res) => {
        this.activecat = item;
        this.workouts$ = res.filter((wrk) =>
          wrk.category_id.toLowerCase().includes(item.id.toLowerCase())
        );
      });
    }
  }
  search(name) {
    if (name === '') {
      this.getWorkouts();
    } else {
      this.workoutService.getWorkouts2().subscribe((res) => {
        this.workouts$ = res.filter((wrk) =>
          wrk.name.toLowerCase().includes(name.toLowerCase())
        );
      });
    }
  }
  goToDetailPage(id: string) {
    this.router.navigate(['workout', id]);
  }
}
