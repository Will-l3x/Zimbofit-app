import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { RequestService } from '../../../services/request.service';
import { combineLatest } from 'rxjs';
import { PurchaseItem } from '../../../interfaces/purchase-item';
import { MealPlanDeliveryConfirmComponent } from '../meal-plan-delivery-confirm/meal-plan-delivery-confirm.component';

@Component({
  selector: 'meal-plan-request-button',
  templateUrl: './meal-plan-request-button.component.html',
  styleUrls: ['./meal-plan-request-button.component.scss'],
})
export class MealPlanRequestButtonComponent implements OnInit {
  @Input() item: PurchaseItem;
  request;

  constructor(private actionSheetCtrl: ActionSheetController,
    private popoverController: PopoverController,
    private cartService: CartService,
    private requestService: RequestService,
    private userService: UserService) { }

  ngOnInit() {
    combineLatest([
      this.userService.getCurrentUser(),
      this.requestService.getRequest(this.item.id)
    ]).subscribe(([user, request]) => {
      this.request = request;
    });
  }

  async onPurchase() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Purchase Meal Plan: $${this.item.price || 0}`,
      subHeader: `Our nutritionist will get in touch with you after your purchase and arrange a tailored consultation with you`,
      buttons: [
        {
          text: `Purchase`,
          icon: 'card',
          handler: () => {
            // console.log(this.item);
            this.cartService.addItem(this.item);
          }
        },
        {
          text: `Cancel`,
          icon: 'close',
          handler: () => {

          }
        }
      ]
    });

    await actionSheet.present();
  }

  async onConfirm() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Confirmation of Delivery`,
      subHeader: `You are about to confirm delivery of the meal plan`,

      buttons: [
        {
          text: `Confirm`,
          icon: 'card',
          handler: () => {
            this.request.status = 'confirmed';
            this.requestService.updateRequest(this.request);
          }
        },
        {
          text: `Cancel`,
          icon: 'close',
          handler: () => {

          }
        }
      ]
    });

    await actionSheet.present();
  }

  async onRequestConfirm() {
    const modal = await this.popoverController.create({
      component: MealPlanDeliveryConfirmComponent,
      componentProps: { rating: this.request.rating }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    // console.log(data);
    if (data) {
      this.request.rating = data;
      this.request.status = 'confirmed';
      this.requestService.updateRequest(this.request);
    }
  }
}
