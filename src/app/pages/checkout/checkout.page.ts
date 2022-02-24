/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { PaymentMethodPage } from '../payment-method/payment-method.page';
import { CartService } from '../../services/cart.service';
import { InvoiceService } from '../../services/invoice.service';
import { UserService } from '../../services/user.service';
import { PurchaseItem } from '../../interfaces/purchase-item';
import { Invoice } from '../../interfaces/invoice';
import { SettingsService } from '../../services/setting.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  items: PurchaseItem[] = [];
  total = 0;
  rate = 1;
  invoiceId: string;
  invoice: Invoice;
  page = 'Checkout';
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
  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private menu: MenuController,
    private userService: UserService,
    public modalController: PopoverController,
    private settingService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    combineLatest([
      this.cartService.getItems(),
      this.settingService.getSetting('USD ZIM RATE'),
    ]).subscribe(([items, rate]) => {
      // console.log(rate);
      this.rate = (rate as any).value;
      this.items = items;
      this.total = 0;
      this.items.forEach((i) => (this.total += +i.price));
    });
  }
  sidenavOpen() {
    this.menu.enable(true, 'menu-content-checkout');
    this.menu.open('menu-content-checkout');
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PaymentMethodPage,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);

    const user = await this.userService
      .getCurrentUser()
      .pipe(take(1))
      .toPromise();

    if (!user) {
      console.log('No user logged in');
      return;
    }

    this.invoice = {
      id: this.invoiceService.getNewId(),
      amount: this.total,
      user_id: user.id,
      user_name: user.name,
      timestamp: new Date().getTime(),
      items: this.items,
    };

    const { id } = await this.invoiceService.updateInvoice(this.invoice);
    console.log(id);

    if (data.methodName) {
      switch (data.methodName) {
        case 'EcoCash': {
          this.router.navigateByUrl(`/app/tabs/payment/ecocash/${id}`);
          break;
        }
        case 'OneMoney': {
          this.router.navigateByUrl(`/app/tabs/payment/onemoney/${id}`);
          break;
        }
        case 'Credit Card': {
          this.router.navigateByUrl(`/app/tabs/payment/credit-card/${id}`);
          break;
        }
        case 'Cash': {
          this.router.navigateByUrl(`/app/tabs/payment/cash/${id}`);
          break;
        }
        case 'PayPal': {
          this.router.navigateByUrl(`/app/tabs/payment/paypal/${id}`);
          break;
        }
      }
    }
  }
}
