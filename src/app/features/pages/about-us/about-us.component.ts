import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'About Us',
      description: 'Learn about ArvinPlus™ — a Dehradun-based ayurvedic supplement brand committed to clean, research-backed formulations for liver detox, immunity, and overall wellness. GMP certified, ISO 9001:2015 and FSSAI approved manufacturing.',
      keywords: 'about ArvinPlus, ayurvedic supplement brand, herbal medicine company India, natural wellness, GMP certified supplements, Dehradun supplements',
      url: 'https://arvinplus.in/about-us',
    });
  }
}
