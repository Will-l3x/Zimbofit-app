import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, of, combineLatest, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ExerciseService } from '../../services/exercise.service';
import { CategoryService } from '../../services/category.service';
import { TrainerService } from '../../services/trainer.service';
import { MuscleGroupService } from '../../services/muscle-group.service';
import { take, map } from 'rxjs/operators';
import { ProgramService } from '../../services/program.service';
import { WorkoutService } from '../../services/workout.service';
import { UserProgramService } from '../../services/user-program.service';

@Component({
  selector: 'create-program',
  templateUrl: './create-program.page.html',
  styleUrls: ['./create-program.page.scss'],
})
export class CreateProgramPage implements OnInit, OnDestroy {

  form = new FormGroup({});
  model: any;
  fields: FormlyFieldConfig[] = [];

  edit = false;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private workoutService: WorkoutService,
    private programService: ProgramService,
    private userProgramService: UserProgramService) { }

  ngOnInit() {
    let program$;
    const id = this.route.snapshot.paramMap.get('programId');
    if (id) {
      program$ = this.userProgramService.getProgram(id);
      this.edit = true;
    } else {
      program$ = of(null);
      this.edit = false;
    }
    const fields$ = this.programService.getFields();
    const user$ = this.userService.getCurrentUser();

    this.subscription = combineLatest([program$, fields$, user$]).subscribe(([workout, fields, user]) => {
      if (user) {
        this.fields = fields.map(f => {
          if(f.key === "category_id"){
            f.templateOptions.options = this.categoryService.getCategories();
          }
          if(f.key === "workouts"){
            f.fieldArray.fieldGroup.map(fg => {
              if(fg.key === "workout_id"){
                fg.templateOptions.options = 
                combineLatest([this.userService.getAuthoredWorkouts(), this.workoutService.getWorkouts()]).pipe(
                  take(1),
                  map(([myWorkouts, workouts]) => myWorkouts.concat(workouts))
                );
              }
  
              return fg;
            })
          }
          return f;
        });
        if (workout) {
          this.model = workout;
        } else {
          this.model = {
            id: this.programService.getNewId(),
            timestamp: (new Date()).getTime(),
            user_id: user.id
          };
        }

        console.log(this.form);
      }
    });
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }

  submit(model) {
    console.log(model);
    this.userProgramService.updateProgram(model);
    this.router.navigateByUrl(`app/tabs/programs/program/${model.id}`);
  }
}
