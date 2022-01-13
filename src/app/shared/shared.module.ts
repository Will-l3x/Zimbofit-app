import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { IonicModule } from '@ionic/angular';

import { RepeatTypeComponent } from './components/repeat-type/repeat-type.component';
import { ImageComponent } from './components/image/image.component';
import { LikeComponent } from './components/like/like.component';
import { RatingComponent } from './components/rating/rating.component';
import { ShareComponent } from './components/share/share.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { RatingEditComponent } from './components/rating-edit/rating-edit.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { PopularityComponent } from './components/popularity/popularity.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { CartMenuButtonComponent } from './components/cart-menu-button/cart-menu-button.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { ShareFacebookButtonComponent } from './components/share-facebook-button/share-facebook-button.component';
import { ShareTwitterButtonComponent } from './components/share-twitter-button/share-twitter-button.component';
import { LoginPopoverComponent } from './components/login-popover/login-popover.component';
import { MealPlanRequestButtonComponent } from './components/meal-plan-request-button/meal-plan-request-button.component';
import { MealPlanDeliveryConfirmComponent } from './components/meal-plan-delivery-confirm/meal-plan-delivery-confirm.component';

@NgModule({
  declarations: [
    RepeatTypeComponent,
    ImageComponent,
    LikeComponent,
    RatingComponent,
    ShareComponent,
    WorkInProgressComponent,
    RatingEditComponent,
    CategoryFilterComponent,
    PopularityComponent,
    AddToCartButtonComponent,
    CartMenuButtonComponent,
    ShareButtonComponent,
    ShareFacebookButtonComponent,
    ShareTwitterButtonComponent,
    LoginPopoverComponent,
    MealPlanRequestButtonComponent,
    MealPlanDeliveryConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
      ],
    }),
    IonicModule,
    IonicRatingModule,
    RouterModule
  ],
  entryComponents: [
    RatingEditComponent,
    LoginPopoverComponent,
    MealPlanDeliveryConfirmComponent
  ],
  exports: [
    RepeatTypeComponent,
    ImageComponent,
    LikeComponent,
    RatingComponent,
    ShareComponent,
    WorkInProgressComponent,
    CategoryFilterComponent,
    PopularityComponent,
    AddToCartButtonComponent,
    CartMenuButtonComponent,
    ShareButtonComponent,
    ShareFacebookButtonComponent,
    ShareTwitterButtonComponent,
    MealPlanRequestButtonComponent
  ]
})
export class SharedModule { }
