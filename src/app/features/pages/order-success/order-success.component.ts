import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaymentService, OrderLookupResponse } from '../../../services/payment/payment.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-order-success',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css',
})
export class OrderSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private paymentService = inject(PaymentService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  loading = true;
  failed = false;
  errorMessage = '';

  orderId = 0;
  orderNumber = '';
  order: OrderLookupResponse | null = null;

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Order Confirmed',
      description: 'Your ArvinPlus™ order has been placed successfully. A confirmation email with tracking details will be sent to you shortly.',
      url: 'https://arvinplus.in/order-success',
      robots: 'noindex, nofollow',
    });

    this.route.queryParams.subscribe((params) => {
      this.orderId = Number(params['orderId']) || 0;
      this.orderNumber = params['orderNumber'] || '';
      const token = params['token'] || '';

      if (!this.orderId || !token) {
        this.loading = false;
        this.failed = true;
        this.errorMessage = 'We could not verify this order. Please contact support with your order reference.';
        return;
      }

      // The order lookup hits the storefront API; only run in the browser
      // (SSR renders the loading state, then hydrates on the client).
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.paymentService.getOrder(this.orderId, token).then((order) => {
        this.loading = false;
        if (order && order.success) {
          this.order = order;
          if (this.orderNumber && this.orderNumber !== order.order_number) {
            this.orderNumber = order.order_number;
          }
        } else {
          this.failed = true;
          this.errorMessage = (order as any)?.message || 'We could not find this order.';
        }
      });
    });
  }

  get currency(): string {
    return this.order?.currency || 'INR';
  }

  formatAmount(value: number): string {
    return Number(value || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: this.currency,
      maximumFractionDigits: 2,
    });
  }
}
