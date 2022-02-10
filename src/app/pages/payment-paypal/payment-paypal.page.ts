import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../interfaces/invoice';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { PurchasesService } from '../../services/purchases.service';
import { InvoiceService } from '../../services/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'payment-paypal',
  templateUrl: './payment-paypal.page.html',
  styleUrls: ['./payment-paypal.page.scss'],
})
export class PaymentPaypalPage implements OnInit {

  total: number;
  invoice: Invoice;
  approval_url: string;

  constructor(private cartService: CartService,
    private paymentService: PaymentService,
    private purchasesService: PurchasesService,
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const invoiceId = this.route.snapshot.paramMap.get('invoice_id');
    this.invoiceService.getInvoice(invoiceId).subscribe(async invoice => {
      this.invoice = invoice;
      this.invoice.items.forEach(i => this.total += +i.price);
      if (this.invoice && this.invoice.items.length) {
        console.log(this.invoice);
        const links = await this.purchasesService.initiatePaypalPurchases(this.invoice);
        console.log(links);
        this.approval_url = links['approval_url'].href;
      }
    });

    this.paymentService.getPayment(invoiceId).subscribe((payment: any) => {
      if (payment && ( payment.status === 'Paid' || payment.status === 'approved')) {
        this.cartService.emptyCart();
        this.router.navigateByUrl('/app/tabs/purchases');
      }
    });
  }

  async onPurchase() {
    window.open(this.approval_url, '_system', 'location=yes');
  }

}
