/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'my-workout-list-item',
  templateUrl: './my-workout-list-item.component.html',
  styleUrls: ['./my-workout-list-item.component.scss'],
})
export class MyWorkoutListItemComponent implements OnInit {
  @Input() workout: any;
  collapsed = false;
  exercises = [];
  imageUrl = 'assets/img/placeholder.png';
  mine = false;
  delete = new EventEmitter();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.imageUrl = this.workout.image_url
      ? this.workout.image_url
      : 'assets/img/products/advance-card-bttf.png';
  }

  onDelete() {
    this.delete.emit(this.workout);
  }
  goToDetailPage(id: string) {
    this.router.navigate(['/app/tabs/workouts/workout/', id]);
  }
  onCreate(workout: any) {
    this.router.navigate(['/app/tabs/workouts/workout/edit'], workout.id);
  }
}
