import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { CustomerAuthService } from '../auth/customer-auth.service';

export interface CustomerOrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CustomerOrder {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  subtotal: number;
  shipping: number;
  grand_total: number;
  currency: string;
  created_at: string;
  items_count: number;
  items: CustomerOrderItem[];
}

export class OrderUnauthorizedError extends Error {}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private auth = inject(CustomerAuthService);

  private readonly apiUrl = environment.apiUrl;

  async getOrders(): Promise<CustomerOrder[]> {
    try {
      const res = await fetch(`${this.apiUrl}/api/storefront/account/orders`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${this.auth.token}` },
      });

      if (res.status === 401) {
        throw new OrderUnauthorizedError('Session expired');
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        return [];
      }

      return data.orders ?? [];
    } catch (err) {
      if (err instanceof OrderUnauthorizedError) {
        this.auth.logout();
        throw err;
      }
      return [];
    }
  }

  async getOrder(id: number): Promise<(CustomerOrder & { shipping_address?: string | null; timeline?: { status: string; note: string; created_at: string }[] }) | null> {
    try {
      const res = await fetch(`${this.apiUrl}/api/storefront/account/orders/${id}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${this.auth.token}` },
      });

      if (res.status === 401) {
        throw new OrderUnauthorizedError('Session expired');
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        return null;
      }

      return data.order;
    } catch (err) {
      if (err instanceof OrderUnauthorizedError) {
        this.auth.logout();
      }
      return null;
    }
  }
}
