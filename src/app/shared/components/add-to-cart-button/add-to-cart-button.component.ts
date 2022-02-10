import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { LoginPopoverComponent } from '../login-popover/login-popover.component';
import { PurchaseItem } from '../../../interfaces/purchase-item';

@Component({
  selector: 'add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss'],
})
export class AddToCartButtonComponent implements OnInit {
  @Input() item: PurchaseItem;

  constructor(private cartService: CartService,
    private popoverCtrl: PopoverController,
    private userService: UserService) { }

  ngOnInit() { }

  addToCart() {
    this.userService.getCurrentUser().subscribe(async user => {
      if (user) {
        this.cartService.addItem(this.item);
      } else {
        const popover = await this.popoverCtrl.create({
          component: LoginPopoverComponent,
          componentProps: { title: 'Please login to purchase items' }
        });
        await popover.present();
      }
    });
  }
}
