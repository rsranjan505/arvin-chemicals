import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { resolveImageUrl } from '../../utils/image-url.util';

export interface ProductSummary {
  id: number;
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  sale_price: number | null;
  has_discount?: boolean;
  discount_price?: number | null;
  discount_type?: 'percentage' | 'fixed' | null;
  discount_value?: number | null;
  capsule: number | null;
  rating: number;
  image: string | null;
  in_stock: boolean;
  featured: boolean;
  best_seller: boolean;
  new_arrival: boolean;
  category: string | null;
}

export interface ProductDetail extends ProductSummary {
  sku: string | null;
  description: string | null;
  short_description: string | null;
  stock_quantity: number;
  images: string[];
  benefits: string[];
  specifications: { title: string; description: string }[];
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
}

interface ProductsResponse {
  success: boolean;
  products?: ProductSummary[];
  count?: number;
}

interface ProductResponse {
  success: boolean;
  product?: ProductDetail;
}

function normalizeInStock(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  return value === true || value === 1 || value === '1' || value === 'true';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async getProducts(): Promise<ProductSummary[]> {
    try {
      const res = await fetch(`${environment.apiUrl}/api/storefront/products`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const data = (await res.json()) as ProductsResponse;

      if (!res.ok || !data.success) {
        return [];
      }

      return (data.products ?? []).map((product) => ({
        ...product,
        in_stock: normalizeInStock(product.in_stock),
        image: resolveImageUrl(product.image),
      }));
    } catch {
      return [];
    }
  }

  async getProductBySlug(slug: string): Promise<ProductDetail | null> {
    try {
      const res = await fetch(`${environment.apiUrl}/api/storefront/products/${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        return null;
      }

      const data = (await res.json()) as ProductResponse;

      if (!data.success || !data.product) {
        return null;
      }

      return {
        ...data.product,
        in_stock: normalizeInStock(data.product.in_stock),
        image: resolveImageUrl(data.product.image),
        images: (data.product.images ?? []).map((img) => resolveImageUrl(img) ?? ''),
      };
    } catch {
      return null;
    }
  }
}
