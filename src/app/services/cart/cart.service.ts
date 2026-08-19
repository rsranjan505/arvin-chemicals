import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  capsule: number;
  image: string;
  quantity: number;
}

const STORAGE_KEY = 'arvin_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private platformId = inject(PLATFORM_ID);

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  items$ = this.itemsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.itemsSubject.next(JSON.parse(raw));
      }
    } catch {
      this.itemsSubject.next([]);
    }
  }

  private persist(items: CartItem[]) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  getCount(): number {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.getItems().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addToCart(product: {
    slug: string;
    name: string;
    subtitle: string;
    price: number;
    capsule: number;
    image: string;
  }, quantity = 1) {
    const items = this.getItems();
    const existing = items.find((item) => item.slug === product.slug);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }
    this.itemsSubject.next([...items]);
    this.persist(items);
  }

  updateQuantity(slug: string, quantity: number) {
    const items = this.getItems();
    const item = items.find((i) => i.slug === slug);
    if (!item) return;
    item.quantity = quantity;
    if (item.quantity <= 0) {
      this.removeItem(slug);
      return;
    }
    this.itemsSubject.next([...items]);
    this.persist(items);
  }

  removeItem(slug: string) {
    const items = this.getItems().filter((i) => i.slug !== slug);
    this.itemsSubject.next(items);
    this.persist(items);
  }

  clear() {
    this.itemsSubject.next([]);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }
}
