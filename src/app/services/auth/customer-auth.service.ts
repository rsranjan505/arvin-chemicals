import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';

export interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  member_since?: string | null;
}

export interface OtpRequestResult {
  ok: boolean;
  message: string;
  emailMasked?: string;
  expiresIn?: number;
}

export interface OtpVerifyResult {
  ok: boolean;
  message: string;
  requireResend?: boolean;
}

const TOKEN_KEY = 'arvin_customer_token';
const CUSTOMER_KEY = 'arvin_customer';

@Injectable({ providedIn: 'root' })
export class CustomerAuthService {
  private platformId = inject(PLATFORM_ID);

  private readonly apiUrl = environment.apiUrl;

  readonly customer = signal<Customer | null>(this.restoreCustomer());

  get token(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.token && !!this.customer();
  }

  async requestOtp(email: string): Promise<OtpRequestResult> {
    try {
      const res = await fetch(`${this.apiUrl}/api/storefront/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { ok: false, message: data.message ?? 'Could not send the code. Please try again.' };
      }

      return {
        ok: true,
        message: data.message,
        emailMasked: data.email_masked,
        expiresIn: data.expires_in,
      };
    } catch {
      return { ok: false, message: 'Network error. Please check your connection and try again.' };
    }
  }

  async verifyOtp(email: string, otp: string): Promise<OtpVerifyResult> {
    try {
      const res = await fetch(`${this.apiUrl}/api/storefront/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          ok: false,
          message: data.message ?? 'Verification failed. Please try again.',
          requireResend: !!data.require_resend,
        };
      }

      this.persistSession(data.token, data.customer);
      return { ok: true, message: data.message };
    } catch {
      return { ok: false, message: 'Network error. Please check your connection and try again.' };
    }
  }

  async refreshCustomer(): Promise<void> {
    if (!this.token) return;

    try {
      const res = await fetch(`${this.apiUrl}/api/storefront/account/me`, {
        headers: this.authHeaders(),
      });

      if (res.status === 401) {
        this.clearSession();
        return;
      }

      const data = await res.json();
      if (data.success && data.customer) {
        this.customer.set(data.customer);
        this.persistCustomer(data.customer);
      }
    } catch {
      /* keep cached customer */
    }
  }

  async updateProfile(name: string, mobile: string | null): Promise<{ ok: boolean; message: string }> {
    try {
      const res = await fetch(`${this.apiUrl}/api/storefront/account/profile`, {
        method: 'PUT',
        headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile }),
      });
      const data = await res.json();

      if (res.status === 401) {
        this.clearSession();
        return { ok: false, message: 'Your session has expired. Please log in again.' };
      }

      if (!res.ok || !data.success) {
        return { ok: false, message: data.message ?? 'Could not update your profile.' };
      }

      this.customer.set(data.customer);
      this.persistCustomer(data.customer);
      return { ok: true, message: data.message };
    } catch {
      return { ok: false, message: 'Network error. Please try again.' };
    }
  }

  logout(): void {
    if (this.token) {
      fetch(`${this.apiUrl}/api/storefront/account/logout`, {
        method: 'POST',
        headers: this.authHeaders(),
      }).catch(() => undefined);
    }
    this.clearSession();
  }

  private authHeaders(): Record<string, string> {
    return { Accept: 'application/json', Authorization: `Bearer ${this.token}` };
  }

  private persistSession(token: string, customer: Customer): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
      } catch {
        /* storage unavailable */
      }
    }
    this.customer.set(customer);
  }

  private persistCustomer(customer: Customer): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
      } catch {
        /* storage unavailable */
      }
    }
  }

  private clearSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CUSTOMER_KEY);
      } catch {
        /* ignore */
      }
    }
    this.customer.set(null);
  }

  private restoreCustomer(): Customer | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = localStorage.getItem(CUSTOMER_KEY);
      return raw ? (JSON.parse(raw) as Customer) : null;
    } catch {
      return null;
    }
  }
}
