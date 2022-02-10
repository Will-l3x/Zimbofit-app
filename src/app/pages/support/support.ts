import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { AlertController, ToastController } from '@ionic/angular';
import { SupportService } from '../../services/support.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  styleUrls: ['./support.scss']
})
export class SupportPage {
  submitted = false;
  supportMessage: string;
  user: any;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private supportService: SupportService,
    private userService: UserService,
    private router: Router
  ) {}

  async ionViewDidEnter() {
    this.userService.getCurrentUser().subscribe(user => (this.user = user));
    const toast = await this.toastCtrl.create({
      message: 'Thank you for taking time to give us feedback.',
      duration: 5000
    });
    await toast.present();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      console.log(form.value);
      if (this.user) {
        this.supportMessage = '';
        this.submitted = false;
        const query = {
          id: this.supportService.getNewId(),
          message: form.value.supportQuestion,
          user_id: this.user.id,
          date: moment(new Date()).format('YYYY-MM-DD'),
          timestamp: new Date().getTime()
        };

        this.supportService.updateQuery(query);

        const toast = await this.toastCtrl.create({
          message: 'Your feedback message has been sent.',
          duration: 3000
        });

        await toast.present();
        this.router.navigateByUrl('/app/tabs/queries');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Please login first.',
          duration: 3000
        });

        await toast.present();
      }

    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  // async ionViewCanLeave(): Promise<boolean> {
  //   // If the support message is empty we should just navigate
  //   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
  //     return true;
  //   }

  //   return new Promise((resolve: any, reject: any) => {
  //     const alert = await this.alertCtrl.create({
  //       title: 'Leave this page?',
  //       message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
  //       buttons: [
  //         { text: 'Stay', handler: reject },
  //         { text: 'Leave', role: 'cancel', handler: resolve }
  //       ]
  //     });

  //     await alert.present();
  //   });
  // }
}
