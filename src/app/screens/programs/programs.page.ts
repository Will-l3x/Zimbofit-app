import { Component, OnInit } from '@angular/core';

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
export class ProgramsPage implements OnInit {
  programs$: Program[] = [];

  constructor(private programService: ProgramService, private router: Router) {}
  ngOnInit() {
    this.getPrograms();
  }
  getPrograms() {
    this.programService.getPrograms().subscribe((res) => {
      this.programs$ = res;
    });
  }
  search(name) {
    if (name === '') {
      this.getPrograms();
    } else {
      this.programService.getPrograms().subscribe((res) => {
        this.programs$ = res.filter((prog) =>
          prog.name.toLowerCase().includes(name.toLowerCase())
        );
      });
    }
  }
  goToProgramDetailsPage(id: string) {
    this.router.navigate(['program-details', id]);
  }
}
