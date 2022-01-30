/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import SwiperCore, { SwiperOptions } from 'swiper';
import { Category } from 'src/app/interfaces/category.model';
import { Exercise } from 'src/app/interfaces/exercise.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
  providers: [CategoryService,ExerciseService],
})
export class ExercisesPage implements OnInit, OnDestroy {
  categories$: Category[] = [];
  exercises$: Exercise[] = [];
  config: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 15,
    navigation: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  private unsubscribeCat$ = new Subject<void>();
  private unsubscribeExe$ = new Subject<void>();
  constructor(
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  acronym(text) {
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

  ngOnInit() {
    if (window.innerWidth <= 320) {
      this.config = {
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: false,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      };
    }
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.unsubscribeCat$))
      .subscribe((res) => {
        this.categories$ = [
          {
            active: true,
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
    this.exerciseService
      .getExercises()
      .pipe(takeUntil(this.unsubscribeExe$))
      .subscribe((res) => {
        this.exercises$ = [];
        const exercises = [];
        for (const exercise of res) {
          exercise.name =
            exercise.name.length >= 32
              ? this.acronym(exercise.name)
              : exercise.name;
          exercise.image_url =
            exercise.image_url === ''
              ? 'assets/img/home/category.jpg'
              : exercise.image_url;
          exercises.push(exercise);
        }
        this.exercises$ = this.exercises$.concat(exercises);
      });
  }

  ngOnDestroy() {
    this.unsubscribeCat$.next();
    this.unsubscribeCat$.complete();
    this.unsubscribeExe$.next();
    this.unsubscribeExe$.complete();
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  goToDetailPage(id: string) {
    this.router.navigate(['exercise-details', id]);
  }
}
