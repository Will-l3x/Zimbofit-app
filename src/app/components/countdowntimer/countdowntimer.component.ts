/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
interface timeComponents {
  secondsTo: number;
  minutesTo: number;
  marks: string;
}

@Component({
  selector: 'app-countdowntimer',
  templateUrl: './countdowntimer.component.html',
  styleUrls: ['./countdowntimer.component.scss'],
})
export class CountdowntimerComponent implements OnInit {
  @Input() time: number;
  @Output() countdowntimer: EventEmitter<boolean> = new EventEmitter();
  public timeLeft$: Observable<timeComponents>;
  countdown;
  constructor() {}

  ngOnInit() {}

  calcCountdownDiff(marks): timeComponents {
    const countdown = this.countdown <= 0 ? this.countdown = 0 : --this.countdown;
    this.countdown = countdown;
    const minutesTo = Math.floor(countdown / 60);
    const secondsTo = countdown % 60;

    return { secondsTo, minutesTo, marks };
  }
  CountdowntimeReady() {
    this.countdown = 5;

    this.timeLeft$ = interval(1000).pipe(
      map((x) => this.calcCountdownDiff('Ready')),
      shareReplay(1)
    );
    this.timeLeft$.subscribe((res) => {
      if (res.secondsTo === 0) {
        this.CountdowntimeStarted();
      }
    });
  }
  CountdowntimeStarted() {
    this.countdown = this.time * 60;

    this.timeLeft$ = interval(1000).pipe(
      map((x) => this.calcCountdownDiff('Go')),
      shareReplay(1)
    );
    this.timeLeft$.subscribe((res) => {
      if (res.secondsTo === 0) {
        this.CountdowntimerStopped();
      }
    });
  }
  CountdowntimerStopped() {
    this.countdowntimer.emit(true);
  }
}
