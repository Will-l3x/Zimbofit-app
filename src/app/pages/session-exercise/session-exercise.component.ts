import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ModalController, ToastController, ActionSheetController } from '@ionic/angular';

import { SessionExercise } from '../../interfaces/session-exercise';

@Component({
  selector: 'session-exercise',
  templateUrl: './session-exercise.component.html',
  styleUrls: ['./session-exercise.component.scss'],
})
export class SessionExerciseComponent implements OnInit {

  @Input() sessionExercise: SessionExercise;

  time = '00:00';
  start = moment();
  sets: any;
  outstandingSets: any[];

  constructor(private modalCtrl: ModalController,
    private toastController: ToastController,
    public actionSheetCtrl: ActionSheetController, ) { }

  ngOnInit() {
    console.log(this.sessionExercise);

    this.sets = this.sessionExercise.sets.map(set => {
      return { ...set };
    });
    this.outstandingSets = this.sets.filter((set: any) => !set.completed);

    setInterval(() => {
      const seconds = moment().diff(this.start, 'seconds');
      const minute = Math.floor(seconds / 60);
      const minuteString = minute > 9 ? minute : '0' + minute;
      const second = seconds % 60;
      const secondString = second > 9 ? second : '0' + second;
      this.time = `${minuteString}:${secondString}` ;
    }, 1000);
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  onExerciseComplete() {
    this.modalCtrl.dismiss({
      exercise: this.sessionExercise,
      sets: this.sets,
      event: 'completed'
    });
  }

  async onSetComplete({set, measurements}) {
    set.completed = true;
    set.measurements = measurements;

    console.log(this.sets);
    this.outstandingSets = this.sets.filter((st: any) => !st.completed);
    if (this.outstandingSets.length) {
      const toast = await this.toastController.create({
        message: `${this.outstandingSets.length} more sets to go`,
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: `Exercise Completed`,
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }
  }

  onSetAdjust({set, measurements}) {
    set.measurements = measurements;
  }

}
