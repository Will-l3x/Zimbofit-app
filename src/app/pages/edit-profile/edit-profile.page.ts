import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { take } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  form = new FormGroup({});
  model: any;
  fields: FormlyFieldConfig[] = [];

  CURRENT_USER = 'current_user';
  userSubscription: Subscription;
  fieldsSubscription: Subscription;

  constructor(private userService: UserService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.getCurrentUser().subscribe(user => {
      this.model = user;
    });

    this.fieldsSubscription = this.userService.getFields().subscribe(fields => {
      console.log(fields);
      this.fields = fields.map(f => {
        if (f.key === 'goals') {
          f.templateOptions.options = this.categoryService.getCategories();
        }
        return f;
      });
    });
  }

  ngOnDestroy(){
    if(this.fieldsSubscription) this.fieldsSubscription.unsubscribe();
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }

  submit(model) {
    console.log(model);
    model.profile_complete = true;
    this.userService.updateUser(model);
    this.router.navigateByUrl('/profile');
  }
}
