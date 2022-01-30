import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { Program } from 'src/app/interfaces/program.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit, OnDestroy {
  programs$: Program[] = [];

  private unsubscribeProgram$ = new Subject<void>();
  constructor(private programService: ProgramService, private router: Router) {}
  acronym(text) {
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

  ngOnInit() {
    const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

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
  }
  goToProgramDetailsPage(id: string) {
    this.router.navigate(['program-details', id]);
  }
}
