import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart/cart.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private seo = inject(SeoService);

  items: CartItem[] = [];
  subtotal = 0;

  readonly freeShippingThreshold = 999;
  readonly shippingFee = 99;

  ngOnInit() {
    this.cartService.items$.subscribe((items) => {
      this.items = items;
      this.subtotal = this.cartService.getSubtotal();
    });

    this.seo.setPageSeo({
      title: 'Shopping Cart',
      description: 'Review the ayurvedic supplements in your ArvinPlus™ cart before checkout. Free shipping on orders above ₹999 across India.',
      url: 'https://arvinplus.in/cart',
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

  get freeShippingRemaining(): number {
    return Math.max(0, this.freeShippingThreshold - this.subtotal);
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.slug, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.slug, item.quantity - 1);
  }

  remove(slug: string) {
    this.cartService.removeItem(slug);
  }
}
