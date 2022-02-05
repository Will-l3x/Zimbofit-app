import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { Program } from 'src/app/interfaces/program.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [ProgramService],
})
export class DashboardPage implements OnInit {
  picksForUser$: Program[] = [];
  myprograms$: Program[] = [];
  programs$: Program[] = [];

  constructor(
    private menu: MenuController,
    private programService: ProgramService,
    private router: Router
  ) {}

  ngOnInit() {
    this.programService.getPrograms().subscribe((res) => {
      this.programs$ = res;
      this.picksForUser$ = res.filter((program) => program.price <= 0);
      this.myprograms$ = res.slice(1, 4);
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

  sidenavOpen() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  goToProgramPage(id: string) {
    this.router.navigate(['program-details', id]);
  }
}
