import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart/cart.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private cartService = inject(CartService);
  private paymentService = inject(PaymentService);
  private router = inject(Router);
  private seo = inject(SeoService);

  items: CartItem[] = [];
  subtotal = 0;

  readonly freeShippingThreshold = 999;
  readonly shippingFee = 99;

  form = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  };

  processing = false;
  errorMessage = '';

  ngOnInit() {
    this.cartService.items$.subscribe((items) => {
      this.items = items;
      this.subtotal = this.cartService.getSubtotal();
    });

    this.seo.setPageSeo({
      title: 'Secure Checkout',
      description: 'Complete your ArvinPlus™ order with a secure 256-bit SSL encrypted Razorpay checkout.',
      url: 'https://arvinplus.in/checkout',
      robots: 'noindex, nofollow',
    });
  }

  get shipping(): number {
    if (this.items.length === 0) return 0;
    return this.subtotal >= this.freeShippingThreshold ? 0 : this.shippingFee;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  get valid(): boolean {
    return (
      !!this.form.name &&
      !!this.form.email &&
      /^[6-9]\d{9}$/.test(this.form.phone) &&
      !!this.form.address &&
      !!this.form.city &&
      !!this.form.state &&
      /^\d{6}$/.test(this.form.pincode) &&
      this.items.length > 0
    );
  }

  async payNow() {
    if (!this.valid || this.processing) return;
    this.processing = true;
    this.errorMessage = '';

    try {
      const order = await this.paymentService.createOrder({
        items: this.items.map((i) => ({
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        address: this.form.address,
        city: this.form.city,
        state: this.form.state,
        pincode: this.form.pincode,
      });

      await this.paymentService.checkout({
        order: {
          key: order.key_id,
          order_id: order.razorpay_order_id,
          amount: order.amount_paise,
          currency: order.currency,
        },
        name: this.form.name,
        email: this.form.email,
        contact: this.form.phone,
        onSuccess: async (payload) => {
          const result = await this.paymentService.verifyPayment(
            order.order_id,
            payload
          );
          this.processing = false;

          if (result.success) {
            this.cartService.clear();
            this.router.navigate(['/order-success'], {
              queryParams: {
                orderId: order.order_id,
                orderNumber: order.order_number,
                token: order.order_token,
              },
            });
          } else {
            this.errorMessage = result.message || 'Payment verification failed.';
          }
        },
        onError: () => {
          this.processing = false;
        },
      });
    } catch (e: any) {
      this.processing = false;
      this.errorMessage = e?.message || 'Something went wrong. Please try again.';
    }
  }
}
