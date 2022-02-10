/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgramService } from '../../../../services/program.service';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { ViewService } from '../../../../services/view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss'],
})
export class ProgramListComponent implements OnInit, OnDestroy {
  programs: any[];
  queryText: string;
  search$: BehaviorSubject<string> = new BehaviorSubject('');
  subscription: Subscription;
  viewed = false;

  constructor(
    private programService: ProgramService,
    private viewService: ViewService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.programService.getPrograms(),
      this.search$,
    ]).subscribe(([programs, search]) => {
      if (search && search.trim()) {
        this.programs = programs.filter((program) =>
          program.name.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.programs = programs;
      }

      if (!this.viewed) {
        this.viewService.viewItems('programs');
        this.viewed = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearch(query) {
    this.search$.next(query);
  }
  goToDetailPage(id: string) {
    this.router.navigate(['/app/tabs/programs/program/', id]);
  }

  presentFilter() {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.programs.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
