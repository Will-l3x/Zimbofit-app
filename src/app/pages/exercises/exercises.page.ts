import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExerciseService } from 'src/app/services/exercise.service';

interface ExerciseItem {
  name: string;
}

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  public searchField: FormControl;
  public exerciseList$: Observable<ExerciseItem[]>;
  constructor(public exerciseService: ExerciseService) {
    this.searchField = new FormControl('');
  }

  async ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    const exerciseList$ = this.exerciseService.getExercises();
    exerciseList$.forEach((ex) => {
      console.log(ex);
    });

    this.exerciseList$ = combineLatest([exerciseList$, searchTerm$]).pipe(
      map(([exerciseList, searchTerm]) =>
        exerciseList.filter(
          (exerciseItem) =>
            searchTerm === '' ||
            exerciseItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}
