/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SettingsService } from '../../services/setting.service';
import { combineLatest } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: any[];
  total = 0;
  rate = 1;
  page = 'Cart';
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
    private settingService: SettingsService,
    private menu: MenuController,
    private userService: UserService
  ) {
    this.user = this.userService.getCurrentUser().pipe(take(1)).toPromise();
  }

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
    this.menu.enable(true, 'menu-content-cart');
    this.menu.open('menu-content-cart');
  }

  removeItem(item) {
    this.cartService.removeItem(item);
  }

  clear() {
    this.cartService.emptyCart();
  }
}
