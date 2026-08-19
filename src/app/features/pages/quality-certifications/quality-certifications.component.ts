import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-quality-certifications',
  imports: [RouterLink],
  templateUrl: './quality-certifications.component.html',
  styleUrl: './quality-certifications.component.css'
})
export class QualityCertificationsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Quality Certifications',
      description: 'ArvinPlus™ supplements are manufactured under Good Manufacturing Practices (GMP) as per WHO guidelines, ISO 9001:2015 compliant, FSSAI approved, and third-party lab tested for purity and potency. Learn about our quality commitment.',
      keywords: 'quality certifications ArvinPlus, GMP certified supplements, ISO 9001, FSSAI approved, third-party tested, herbal supplement quality India',
      url: 'https://arvinplus.in/quality-certifications',
    });
  }
}
