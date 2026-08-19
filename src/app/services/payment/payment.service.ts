import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';

export interface CheckoutItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetails {
  items: CheckoutItem[];
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id: number;
  order_number: string;
  order_token: string;
  key_id: string;
  razorpay_order_id: string;
  amount_paise: number;
  amount: number;
  currency: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  order_id?: number;
  order_number?: string;
}

export interface OrderLookupItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderLookupResponse {
  success: boolean;
  order_id: number;
  order_number: string;
  status: string;
  payment_status: string;
  subtotal: number;
  shipping: number;
  grand_total: number;
  currency: string;
  created_at: string;
  items: OrderLookupItem[];
}

export interface RazorpayCheckoutOptions {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private platformId = inject(PLATFORM_ID);

  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  }

  async createOrder(details: OrderDetails): Promise<CreateOrderResponse> {
    const res = await fetch(`${environment.apiUrl}/api/storefront/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || 'Failed to create payment order');
    }
    return data;
  }

  async verifyPayment(
    orderId: number,
    payload: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }
  ): Promise<VerifyPaymentResponse> {
    const res = await fetch(`${environment.apiUrl}/api/storefront/orders/${orderId}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data?.message || 'Payment verification failed.' };
    }
    return data;
  }

  async getOrder(orderId: number, token: string): Promise<OrderLookupResponse> {
    const res = await fetch(
      `${environment.apiUrl}/api/storefront/orders/${orderId}?token=${encodeURIComponent(token)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        order_id: 0,
        order_number: '',
        status: '',
        payment_status: '',
        subtotal: 0,
        shipping: 0,
        grand_total: 0,
        currency: 'INR',
        created_at: '',
        items: [],
        message: data?.message || 'Order not found.',
      } as OrderLookupResponse;
    }
    return data;
  }

  async checkout(options: {
    order: RazorpayCheckoutOptions;
    name: string;
    email: string;
    contact: string;
    onSuccess: (payload: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => void;
    onError?: (error: any) => void;
  }): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    await this.loadScript();

    const rzp = new window.Razorpay({
      key: options.order.key,
      amount: options.order.amount,
      currency: options.order.currency,
      order_id: options.order.order_id,
      name: 'ArvinPlus™',
      description: 'Premium Wellness Supplements',
      handler: (response: any) => {
        options.onSuccess({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.contact,
      },
      theme: {
        color: '#15803d',
      },
      modal: {
        ondismiss: () => {
          if (options.onError) options.onError('Payment cancelled');
        },
      },
    });

    rzp.open();
  }
}