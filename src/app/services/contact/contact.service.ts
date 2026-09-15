import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private platformId = inject(PLATFORM_ID);

  async submit(payload: ContactPayload): Promise<ContactResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return { success: false, message: 'Enquiries can only be submitted from the browser.' };
    }

    try {
      const res = await fetch(`${environment.apiUrl}/api/storefront/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data?.message || 'Could not submit your enquiry. Please try again.',
        };
      }

      return data;
    } catch {
      return { success: false, message: 'Network error. Please check your connection and try again.' };
    }
  }
}
