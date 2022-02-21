/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'cart-menu-button',
  templateUrl: './cart-menu-button.component.html',
  styleUrls: ['./cart-menu-button.component.scss'],
})
export class CartMenuButtonComponent implements OnInit {
  items = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getItems().subscribe(items => this.items = items);
  }

}
