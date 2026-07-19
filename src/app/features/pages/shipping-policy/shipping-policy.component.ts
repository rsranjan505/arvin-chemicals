import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-shipping-policy',
  imports: [],
  templateUrl: './shipping-policy.component.html',
  styleUrl: './shipping-policy.component.css'
})
export class ShippingPolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Shipping Policy | ArvinPlus™',
      description: 'ArvinPlus™ shipping policy — fast delivery across India. Free shipping on eligible orders, tracking provided, and 1-2 business day processing.',
      keywords: 'shipping policy ArvinPlus, supplement delivery India, free shipping ayurvedic, order tracking, ArvinPlus shipping',
      url: 'https://arvinplus.in/shipping-policy',
    });
  }
}
