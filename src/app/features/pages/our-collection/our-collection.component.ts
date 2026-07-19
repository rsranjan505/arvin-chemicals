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
      title: 'Our Collection | ArvinPlus™',
      description: 'Explore ArvinPlus™ collection of research-backed ayurvedic supplements — Liver Detox, Zinc, Iron, Vitamin K2, Magnesium Glycinate & more. GMP certified.',
      keywords: 'ayurvedic supplement collection, liver detox capsules, zinc tablets, vitamin K2 MK-7, magnesium glycinate, ArvinPlus products',
      url: 'https://arvinplus.in/our-collections',
    });
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  playVideo(video: HTMLVideoElement) {
    video.play();
  }
}
