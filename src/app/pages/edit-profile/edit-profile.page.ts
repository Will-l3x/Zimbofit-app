/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { take } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  model: any;
  fields: FormlyFieldConfig[] = [];
  form: FormGroup = new FormGroup({});
  CURRENT_USER = 'current_user';
  userSubscription: Subscription;
  fieldsSubscription: Subscription;
  appPages = [
    {
      title: 'Dashboard',
      url: '/app/tabs/start',
      icon: 'play',
      requiresUser: true,
    },
    {
      title: 'Programs',
      url: '/app/tabs/programs',
      icon: 'fitness',
      count: 0,
    },
    {
      title: 'Trainers',
      url: '/app/tabs/trainers',
      icon: 'unlock',
      count: 0,
    },

    {
      title: 'Schedules',
      url: '/app/tabs/schedule',
      icon: 'calendar',
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'contacts',
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
    },
  ];
  user;
  page = 'Edit Profile';
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private menu: MenuController,
    private router: Router
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }
  ngOnInit() {
    this.userSubscription = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        this.model = user;
      });

    this.fieldsSubscription = this.userService
      .getFields()
      .subscribe((fields) => {
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].templateOptions.type === 'hidden') {
            fields.splice(i, 1);
          }
        }
        console.log(fields);

        const fctrl = {};
        this.fields = fields.map((f) => {
          fctrl[f.key] = new FormControl();
          if (f.key === 'goals') {
            f.templateOptions.options = this.categoryService.getCategories();
          }
          if (f.key === 'dob') {
            f.templateOptions.label = 'D.O.B.';
          }

          return f;
        });
        this.form = new FormGroup(fctrl);
      });
  }

  ngOnDestroy() {
    if (this.fieldsSubscription) {
      this.fieldsSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-prof-edit');
    this.menu.open('menu-content-prof-edit');
  }
  submit() {
    this.model.name = this.form.controls.name.value;
    this.model.phone = this.form.controls.phone.value;
    this.model.dob = this.form.controls.dob.value;
    this.model.gender = this.form.controls.gender.value;
    this.model.height = this.form.controls.height.value;
    this.model.weight = this.form.controls.weight.value;
    this.model.goals = this.form.controls.goals.value;
    this.model.profile_complete = true;
    this.userService.updateUser(this.model);
    this.router.navigateByUrl('/profile');
  }
}
