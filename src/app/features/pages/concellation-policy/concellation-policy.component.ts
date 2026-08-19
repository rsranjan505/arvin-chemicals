import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-concellation-policy',
  imports: [],
  templateUrl: './concellation-policy.component.html',
  styleUrl: './concellation-policy.component.css'
})
export class ConcellationPolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Cancellation Policy',
      description: 'Learn about ArvinPlus™ order cancellation policy. Cancel within 24 hours of placing your order for a full refund. Already shipped orders are subject to our return policy.',
      keywords: 'cancellation policy ArvinPlus, order cancel, supplement order cancellation, ArvinPlus cancel order',
      url: 'https://arvinplus.in/cancellation-policy',
    });
  }
}
