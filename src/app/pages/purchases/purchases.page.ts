import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../services/purchases.service';

@Component({
  selector: 'purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {
  purchases = [];

  constructor(private purchasesService: PurchasesService) { }

  ngOnInit() {
    this.purchasesService.getPurchases().subscribe(purchases => {
      console.log(purchases);
      this.purchases = purchases;
    });
  }
}
