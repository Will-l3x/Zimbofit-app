import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/app/interfaces/workout.model';

import { Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { Program } from 'src/app/interfaces/program.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [ProgramService, WorkoutService],
})
export class DashboardPage implements OnInit, OnDestroy {
  workouts$: Workout[] = [];
  myworkouts$: Workout[] = [];
  programs$: Program[] = [];

  private unsubscribeProgram$ = new Subject<void>();
  private unsubscribeWorkout$ = new Subject<void>();
  constructor(
    private menu: MenuController,
    private workoutService: WorkoutService,
    private programService: ProgramService,
    private router: Router
  ) {}

  acronym(text) {
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

  ngOnInit() {
    const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

    this.workoutService
      .getWorkouts()
      .pipe(takeUntil(this.unsubscribeWorkout$))
      .subscribe((res) => {
        this.workouts$ = [];
        const workouts = [];
        for (const workout of res) {
          workout.name =
            workout.name.length >= 32
              ? this.acronym(workout.name)
              : workout.name;
          workout.image_url =
            workout.image_url === ''
              ? 'assets/img/home/category.jpg'
              : workout.image_url;
          workout.rating = getRandomArbitrary(0, 5);

          workouts.push(workout);
        }
        this.workouts$ = this.workouts$.concat(workouts.slice(0, 6));
        this.myworkouts$ = workouts.slice(0, 3);
        console.log(this.workouts$);
      });

    this.programService
      .getPrograms()
      .pipe(takeUntil(this.unsubscribeProgram$))
      .subscribe((res) => {
        this.programs$ = [];
        const programs = [];
        for (const program of res) {
          program.name =
            program.name.length >= 32
              ? this.acronym(program.name)
              : program.name;
          program.image_url =
            program.image_url === ''
              ? 'assets/img/home/category.jpg'
              : program.image_url;
          program.rating = getRandomArbitrary(0, 5);
          programs.push(program);
        }
        this.programs$ = this.programs$.concat(programs);
        // const cards = document.getElementsByClassName('card');
        // for (let card of cards) {
        //   card.addEventListener('click', () => {
        //     if (!card.classList.contains('active')) {
        //       for (let c of cards) {
        //         c.classList.remove('active');
        //         card.classList.add('active');
        //       }
        //     }
        //   });
        // }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeProgram$.next();
    this.unsubscribeProgram$.complete();
    this.unsubscribeWorkout$.next();
    this.unsubscribeWorkout$.complete();
  }
  sidenavOpen() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  goToProgramPage(id: string) {
    this.router.navigate(['workout-list', id]);
  }
  goToWorkoutPage(id: string) {
    this.router.navigate(['workout', id]);
  }
}
