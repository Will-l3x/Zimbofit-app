import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../../../services/rating.service';
import { LikeService } from '../../../services/like.service';
import { Subscription, combineLatest } from 'rxjs';
import { ProgramService } from '../../../services/program.service';
import { WorkoutService } from '../../../services/workout.service';

@Component({
  selector: 'popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['./popularity.component.scss'],
})
export class PopularityComponent implements OnInit {
  @Input() targetId;
  subscription: Subscription;
  popularity;

  constructor(
    private likeService: LikeService,
    private ratingService: RatingService,
    private programService: ProgramService,
    private workoutService: WorkoutService) { }

  ngOnInit() {
    this.subscription = combineLatest([
      this.likeService.getLikes(),
      this.ratingService.getRatings(),
      this.workoutService.getWorkouts(),
      this.programService.getPrograms(),
    ]).subscribe(([likes, ratings, workouts, programs]) => {

      const wrks = workouts.filter(w => w.trainer_id === this.targetId);
      const prms = programs.filter(p => p.trainer_id === this.targetId);
      const lks = likes.filter(l => {
        return wrks.find(w => w.id == l.target_id) ||
          prms.find(p => p.id === l.target_id) ||
          l.target_id === this.targetId
      });
      const rtns = ratings.filter(r => {
        return wrks.find(w => w.id == r.target_id) ||
          prms.find(p => p.id === r.target_id) ||
          r.target_id === this.targetId
      });

      this.popularity = (0.9 * this.getRatings(rtns)) + (0.1 * (this.getLikesScore(lks) / 10));
      // console.log(this.popularity);
    });
  }

  getLikesScore(likes: any[]) {
    if (!likes || !likes.length) return 0;
    else if (likes.length > 0 && likes.length < 1000) return 1;
    else if (likes.length >= 1000 && likes.length < 2000) return 2;
    else if (likes.length >= 2000 && likes.length < 3000) return 3;
    else if (likes.length >= 3000 && likes.length < 4000) return 4;
    else if (likes.length >= 4000 && likes.length < 5000) return 5;
    else if (likes.length >= 5000 && likes.length < 6000) return 6;
    else if (likes.length >= 6000 && likes.length < 7000) return 7;
    else if (likes.length >= 7000 && likes.length < 8000) return 8;
    else if (likes.length >= 8000 && likes.length < 10000) return 9;
    else if (likes.length >= 10000) return 10;
  }

  getRatings(ratings: any[]) {
    if (ratings.length > 0) {
      let sum = 0;
      ratings.forEach(rtn => {
        sum += rtn.rate;
      });
      return Math.fround(sum / ratings.length) / 5;
    }
    return 0;
  }
}
