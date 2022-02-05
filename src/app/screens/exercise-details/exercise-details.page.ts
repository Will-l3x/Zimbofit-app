/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subject, Observable } from 'rxjs';
import { Exercise } from 'src/app/interfaces/exercise.model';
import { NavigationService } from 'src/app/services/navigation.service';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.page.html',
  styleUrls: ['./exercise-details.page.scss'],
})
export class ExerciseDetailsPage implements OnInit, OnDestroy {
  id: string;
  exercise: Exercise;
  public interval;
  public destroyed$ = new Subject();
  private countdowntimer = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    history.state.exercise === undefined
      ? this.navigationService.back()
      : (this.exercise = history.state.exercise);
  }

  goBack() {
    this.navigationService.back();
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  getCountdowntimer(state) {
    this.countdowntimer = state;
  }
}
