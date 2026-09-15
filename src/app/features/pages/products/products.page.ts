import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductListsComponent } from '../components/product-lists/product-lists.component';
import { SeoService } from '../../../services/seo/seo.service';
import { ProductSummary } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  imports: [ProductListsComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css'
})
export class ProductsPage implements OnInit {
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  products: ProductSummary[] = [];

  ngOnInit() {
    this.products = this.route.snapshot.data['products'] as ProductSummary[];
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.products = data['products'] as ProductSummary[];
    });
    this.seo.setPageSeo({
      title: 'All Products',
      description: 'Browse the full range of ArvinPlus™ premium health supplements — Liver Detox, Zinc, Iron, Vitamin K2 MK-7, Magnesium Glycinate, Selenium Plus and more. GMP certified, FSSAI approved, free shipping on orders above ₹999.',
      keywords: 'ArvinPlus products, health supplements India, liver detox capsules, zinc tablets, vitamin K2, magnesium glycinate, selenium supplements, herbal supplements',
      url: 'https://arvinplus.in/products',
    });
  }
}
