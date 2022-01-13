import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'login-popover',
  templateUrl: './login-popover.component.html',
  styleUrls: ['./login-popover.component.scss'],
})
export class LoginPopoverComponent implements OnInit {

  @Input() title;
  constructor(public popoverCtrl: PopoverController,
    private router: Router) { }

  ngOnInit() { }

  login() {
    this.router.navigateByUrl('/login');
    this.popoverCtrl.dismiss();
  }

  // signup() {
  //   this.router.navigateByUrl('/signup');
  //   this.popoverCtrl.dismiss();
  // }
}
