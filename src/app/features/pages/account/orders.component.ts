import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService, CustomerOrder, OrderUnauthorizedError } from '../../../services/order/order.service';

@Component({
  selector: 'app-account-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  readonly currentStatuses = ['pending', 'confirmed', 'processing', 'packed', 'shipped'];
  readonly previousStatuses = ['delivered', 'cancelled'];

  tab: 'current' | 'previous' = 'current';

  loading = true;
  sessionExpired = false;
  loadError = false;

  orders: CustomerOrder[] = [];

  expandedId: number | null = null;

  ngOnInit() {
    this.load();
  }

  get currentOrders(): CustomerOrder[] {
    return this.orders.filter((o) => this.currentStatuses.includes(o.status));
  }

  get previousOrders(): CustomerOrder[] {
    return this.orders.filter((o) => !this.currentStatuses.includes(o.status));
  }

  get visibleOrders(): CustomerOrder[] {
    return this.tab === 'current' ? this.currentOrders : this.previousOrders;
  }

  setTab(tab: 'current' | 'previous') {
    this.tab = tab;
    this.expandedId = null;
  }

  toggleExpand(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  async load() {
    this.loading = true;
    this.loadError = false;
    this.sessionExpired = false;
    try {
      this.orders = await this.orderService.getOrders();
      if (!this.orders.length && this.tab === 'current' && this.hasOnlyPrevious()) {
        // no-op; tabs still render counts
      }
    } catch (err) {
      if (err instanceof OrderUnauthorizedError) {
        this.sessionExpired = true;
      } else {
        this.loadError = true;
      }
    } finally {
      this.loading = false;

      // Default to the tab that actually has content.
      if (this.currentOrders.length === 0 && this.previousOrders.length > 0) {
        this.tab = 'previous';
      }
    }
  }

  private hasOnlyPrevious(): boolean {
    return this.previousOrders.length > 0 && this.currentOrders.length === 0;
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

  paymentLabel(status: string): string {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
  }

  paymentClass(status: string): string {
    const map: Record<string, string> = {
      paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      pending: 'bg-amber-50 text-amber-700 border border-amber-200',
      failed: 'bg-red-50 text-red-600 border border-red-200',
    };
    return map[status] ?? 'bg-gray-50 text-gray-600 border border-gray-200';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
