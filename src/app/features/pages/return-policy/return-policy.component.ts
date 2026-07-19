import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-return-policy',
  imports: [],
  templateUrl: './return-policy.component.html',
  styleUrl: './return-policy.component.css'
})
export class ReturnPolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Return & Refund Policy | ArvinPlus™',
      description: 'ArvinPlus™ offers a 30-day return policy on eligible products. Learn about our refund process, eligibility criteria, and shipping costs for returns.',
      keywords: 'return policy ArvinPlus, refund policy, supplement returns India, ayurvedic product refund, ArvinPlus return',
      url: 'https://arvinplus.in/return-policy',
    });
  }
}
