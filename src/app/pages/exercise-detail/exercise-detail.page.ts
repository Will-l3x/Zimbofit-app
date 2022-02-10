import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

import { ExerciseService } from '../../services/exercise.service';
import { LikeService } from '../../services/like.service';
import { UserService } from '../../services/user.service';
import { MuscleGroupService } from '../../services/muscle-group.service';
import { OfflineService } from '../../services/offline.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit, OnDestroy {
  exercise;
  likes = [];
  like;
  viewed = false;

  offline = true;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private exerciseService: ExerciseService,
    private muscleGroupService: MuscleGroupService,
    private offlineService: OfflineService,
    private viewService: ViewService,
    private likeService: LikeService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('exerciseId');
    console.log(id);
    this.subscription = combineLatest([
      this.userService.getLikeOn(id),
      this.likeService.getLikesOn(id),
      this.exerciseService.getExercise(id),
      this.muscleGroupService.getMuscleGroups(),
      this.offlineService.isOffline()
    ])
      .subscribe(([like, likes, exercise, muscles, offline]) => {
        this.exercise = exercise;
        this.likes = likes;
        this.like = like;
        this.offline = offline;

        if (exercise.description) {
          this.exercise.descriptions = exercise.description.split('\n').filter(des => des.length);
        }
        if (exercise.muscleGroup_id) {
          this.exercise.muscle = muscles.find(muscle => muscle.id === this.exercise.muscleGroup_id);
        }
        if (exercise.muscleGroup_ids) {
          this.exercise.muscles = this.exercise.muscleGroup_ids.map(mid => {
            return muscles.find(muscle => muscle.id === mid);
          });
        }

        if (!this.viewed) {
          this.viewService.viewItem(exercise.name, exercise.id, 'exercise');
          this.viewed = true;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
