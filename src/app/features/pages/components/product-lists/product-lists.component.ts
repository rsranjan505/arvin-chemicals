import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';
import {
  ProductService,
  ProductSummary,
} from '../../../../services/product/product.service';

@Component({
  selector: 'app-product-lists',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-lists.component.html',
  styleUrl: './product-lists.component.css',
})
export class ProductListsComponent implements OnInit {
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  products: ProductSummary[] = [];

  loading = true;
  error = false;

  pageSize = 6;
  visibleCount = 6;

  get visibleProducts() {
    return this.products.slice(0, this.visibleCount);
  }

  get hasMore() {
    return this.visibleCount < this.products.length;
  }

  loadMore() {
    this.visibleCount += this.pageSize;
  }

  async ngOnInit() {
    await this.load();
  }

  async load() {
    this.loading = true;
    this.error = false;
    try {
      this.products = await this.productService.getProducts();
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  getStars(rating: number) {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1 <= rating);
  }

  displayPrice(product: ProductSummary): number {
    return product.sale_price ?? product.price;
  }

  addToCart(product: ProductSummary) {
    if (!product.in_stock) return;
    this.cartService.addToCart({
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      price: this.displayPrice(product),
      capsule: product.capsule ?? 0,
      image: product.image ?? '',
    });
  }
}
