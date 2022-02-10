import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { PurchasesService } from '../../services/purchases.service';
import { PaymentService } from '../../services/payment.service';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoice';

@Component({
  selector: 'payment-ecocash',
  templateUrl: './payment-ecocash.page.html',
  styleUrls: ['./payment-ecocash.page.scss'],
})
export class PaymentEcocashPage implements OnInit {
  total: number;
  invoice: Invoice;

  form: FormGroup = new FormGroup({
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(770000000),
        Validators.max(789999999),
        Validators.minLength(10)
      ]
    })
  });

  constructor(private cartService: CartService,
    private paymentService: PaymentService,
    private purchasesService: PurchasesService,
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const invoiceId = this.route.snapshot.paramMap.get('invoice_id');
    this.invoiceService.getInvoice(invoiceId).subscribe(invoice => {
      this.invoice = invoice;
      this.invoice.items.forEach(i => this.total += +i.price);
    });
  }

  onPurchase() {
    if (this.invoice && this.invoice.items.length) {
      console.log(this.form.value);
      this.purchasesService.initiateEcocashPurchases(this.invoice, this.form.value.phone);
      this.paymentService.getPayment(this.invoice.id).subscribe((payment: any) => {
        if (payment && payment.status === 'Paid') {
          this.cartService.emptyCart();
          this.router.navigateByUrl('/app/tabs/purchases');
        }
      });
    }
  }
}
