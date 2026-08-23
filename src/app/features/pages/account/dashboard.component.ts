import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerAuthService, Customer } from '../../../services/auth/customer-auth.service';
import { OrderService, CustomerOrder } from '../../../services/order/order.service';

@Component({
  selector: 'app-account-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private auth = inject(CustomerAuthService);
  private orderService = inject(OrderService);

  customer = this.auth.customer;

  loading = true;
  error = false;

  orders: CustomerOrder[] = [];

  readonly currentStatuses = ['pending', 'confirmed', 'processing', 'packed', 'shipped'];

  ngOnInit() {
    this.load();
  }

  get currentOrders(): CustomerOrder[] {
    return this.orders.filter((o) => this.currentStatuses.includes(o.status));
  }

  get totalSpent(): number {
    return this.orders
      .filter((o) => o.payment_status === 'paid')
      .reduce((sum, o) => sum + o.grand_total, 0);
  }

  async load() {
    this.loading = true;
    this.error = false;
    try {
      this.orders = await this.orderService.getOrders();
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  statusLabel(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-indigo-100 text-indigo-800',
      packed: 'bg-purple-100 text-purple-800',
      shipped: 'bg-cyan-100 text-cyan-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-700',
    };
    return map[status] ?? 'bg-gray-100 text-gray-700';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
