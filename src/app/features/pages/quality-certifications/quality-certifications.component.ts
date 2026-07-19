import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-quality-certifications',
  imports: [],
  templateUrl: './quality-certifications.component.html',
  styleUrl: './quality-certifications.component.css'
})
export class QualityCertificationsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Quality Certifications | ArvinPlus™',
      description: 'ArvinPlus™ supplements are GMP certified, ISO 9001:2015 compliant, and FSSAI approved. Third-party lab tested for purity and potency.',
      keywords: 'quality certifications ArvinPlus, GMP certified supplements, ISO 9001, FSSAI approved, third-party tested, herbal supplement quality India',
      url: 'https://arvinplus.in/quality-certifications',
    });
  }
}
