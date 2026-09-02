import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  products: ProductSummary[] = [];

  loading = true;
  error = false;

  searchQuery = '';

  pageSize = 6;
  visibleCount = 6;

  get filteredProducts(): ProductSummary[] {
    if (!this.searchQuery) return this.products;
    const q = this.searchQuery.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q)
    );
  }

  get visibleProducts() {
    return this.filteredProducts.slice(0, this.visibleCount);
  }

  get hasMore() {
    return this.visibleCount < this.filteredProducts.length;
  }

  loadMore() {
    this.visibleCount += this.pageSize;
  }

  clearSearch() {
    this.router.navigate(['/products']);
  }

  async ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = (params.get('q') ?? '').trim();
      this.visibleCount = this.pageSize;
    });
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
    if (product.has_discount && product.discount_price != null) {
      return product.discount_price;
    }
    return product.sale_price ?? product.price;
  }

  discountPercent(product: ProductSummary): number | null {
    if (
      !product.has_discount ||
      product.discount_price == null ||
      product.price <= 0 ||
      product.discount_price >= product.price
    ) {
      return null;
    }
    return Math.round(((product.price - product.discount_price) / product.price) * 100);
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
