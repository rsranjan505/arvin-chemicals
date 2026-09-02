import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface DeliveryCourier {
  name: string;
  rate: number;
  eta: string | null;
  cod_available: boolean;
  rating: number;
}

export interface DeliveryEstimateResponse {
  success: boolean;
  pincode: string;
  estimated_days: string | null;
  estimated_date: string | null;
  couriers: DeliveryCourier[];
  message?: string;
  cached?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  async getDeliveryEstimate(pincode: string): Promise<DeliveryEstimateResponse> {
    const res = await fetch(
      `${environment.apiUrl}/api/storefront/delivery-estimate?pincode=${encodeURIComponent(pincode)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        pincode,
        estimated_days: null,
        estimated_date: null,
        couriers: [],
        message: data?.message || 'Could not fetch delivery estimate.',
      };
    }
    return data;
  }
}
