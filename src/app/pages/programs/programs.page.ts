import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProgramService } from 'src/app/services/program.service';

interface ProgramItem {
  name: string;
}
@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {
  public searchField: FormControl;
  public programList$: Observable<ProgramItem[]>;
  constructor(public programService: ProgramService) {
  //constructor() {
    this.searchField = new FormControl('');
  }

  async ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    const programList$ = this.programService.getPrograms();
    this.programList$ = combineLatest([programList$, searchTerm$]).pipe(
      map(([programList, searchTerm]) =>
        programList.filter(
          (programItem) =>
            searchTerm === '' ||
            programItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}
