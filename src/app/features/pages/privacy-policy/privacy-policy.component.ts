import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Privacy Policy | ArvinPlus™',
      description: 'ArvinPlus™ respects your privacy. Read our Privacy Policy to understand how we collect, use, and safeguard your personal information.',
      keywords: 'privacy policy ArvinPlus, data protection, personal information, supplement privacy, ArvinPlus privacy',
      url: 'https://arvinplus.in/privacy-policy',
    });
  }
}
