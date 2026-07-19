import { Component, OnInit } from '@angular/core';
import { HomeCategoriesComponent } from "../components/home-categories/home-categories.component";
import { HeroSectionComponent } from "../../../layouts/hero-section/hero-section.component";
import { ProductListsComponent } from "../components/product-lists/product-lists.component";
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HomeCategoriesComponent, HeroSectionComponent, ProductListsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Premium Ayurvedic Supplements for Liver Detox & Wellness',
      description: 'ArvinPlus™ offers research-backed ayurvedic supplements for liver detox, immunity support, bone health, and vitality. GMP certified. Free shipping across India.',
      keywords: 'ayurvedic supplements, liver detox capsules, milk thistle, immunity boost, natural wellness, ArvinPlus, herbal supplements India',
      url: 'https://arvinplus.in',
      image: '/assets/arvin-white.png',
    });
  }
}
