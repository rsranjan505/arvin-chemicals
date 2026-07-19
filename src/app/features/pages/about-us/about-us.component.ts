import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'About Us | ArvinPlus™',
      description: 'Learn about ArvinPlus™ — our mission to provide clean, research-backed ayurvedic supplements for liver detox, immunity, and overall wellness. GMP certified manufacturing.',
      keywords: 'about ArvinPlus, ayurvedic supplement brand, herbal medicine company India, natural wellness, GMP certified supplements',
      url: 'https://arvinplus.in/about-us',
    });
  }
}
