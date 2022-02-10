import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  methods = [
    // { name: "Use My Number" },
    { name: 'PayPal' },
    { name: 'EcoCash' },
    { name: 'OneMoney' },
    // { name: "Credit Card" },
    // { name: "Cash" },
  ];

  constructor(private modalCtrl: PopoverController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onMethod(method) {
    console.log(method);
    // switch (method.name) {
    //   case 'EcoCash': {
    //     this.router.navigateByUrl(`/app/tabs/payment/ecocash/${this.invoiceId}`);
    //     break;
    //   }
    //   case 'OneMoney': {
    //     this.router.navigateByUrl(`/app/tabs/payment/onemoney/${this.invoiceId}`);
    //     break;
    //   }
    //   case 'Credit Card': {
    //     this.router.navigateByUrl(`/app/tabs/payment/credit-card/${this.invoiceId}`);
    //     break;
    //   }
    //   case 'Cash': {
    //     this.router.navigateByUrl(`/app/tabs/payment/cash/${this.invoiceId}`);
    //     break;
    //   }
    // }

    this.modalCtrl.dismiss({
      dismissed: true,
      methodName: method.name
    });
  }
}
