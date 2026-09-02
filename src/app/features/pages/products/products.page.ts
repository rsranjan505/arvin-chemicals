import { Component, OnInit } from '@angular/core';
import { ProductListsComponent } from '../components/product-lists/product-lists.component';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-products',
  imports: [ProductListsComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css'
})
export class ProductsPage implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'All Products',
      description: 'Browse the full range of ArvinPlus™ premium health supplements — Liver Detox, Zinc, Iron, Vitamin K2 MK-7, Magnesium Glycinate, Selenium Plus and more. GMP certified, FSSAI approved, free shipping on orders above ₹999.',
      keywords: 'ArvinPlus products, health supplements India, liver detox capsules, zinc tablets, vitamin K2, magnesium glycinate, selenium supplements, herbal supplements',
      url: 'https://arvinplus.in/products',
    });
  }
}
