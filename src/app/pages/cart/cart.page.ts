import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SettingsService } from '../../services/setting.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: any[];
  total = 0;
  rate = 1;

  constructor(private cartService: CartService, private settingService: SettingsService) { }

  ngOnInit() {
    combineLatest([
      this.cartService.getItems(),
      this.settingService.getSetting('USD ZIM RATE')
    ]).subscribe(([items, rate]) => {
      // console.log(rate);
      this.rate = (rate as any).value;
      this.items = items;
      this.total = 0;
      this.items.forEach(i => this.total += +i.price);
    });
  }

  removeItem(item) {
    this.cartService.removeItem(item);
  }

  clear() {
    this.cartService.emptyCart();
  }
}
