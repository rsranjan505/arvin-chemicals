import { Component, OnInit } from '@angular/core';
import { ProductListsComponent } from "../components/product-lists/product-lists.component";
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-our-collection',
  imports: [ProductListsComponent],
  templateUrl: './our-collection.component.html',
  styleUrl: './our-collection.component.css'
})
export class OurCollectionComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Our Collection',
      description: 'Explore the full ArvinPlus™ collection of research-backed health supplements — Liver Detox, Zinc, Iron, Vitamin K2 MK-7, Magnesium Glycinate, Selenium Plus & more. GMP certified, FSSAI approved, free shipping on orders above ₹999.',
      keywords: 'health supplement collection, liver detox capsules, zinc tablets, vitamin K2 MK-7, magnesium glycinate, selenium plus, ArvinPlus products',
      url: 'https://arvinplus.in/our-collections',
      type: 'website',
    });
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  playVideo(video: HTMLVideoElement) {
    video.play();
  }
}
