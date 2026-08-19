import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from "../../../layouts/hero-section/hero-section.component";
import { ProductListsComponent } from "../components/product-lists/product-lists.component";
import { CustomerStoriesComponent } from "../components/customer-stories/customer-stories.component";
import { HomeBlogComponent } from "../components/home-blog/home-blog.component";
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ HeroSectionComponent, ProductListsComponent, CustomerStoriesComponent, HomeBlogComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Premium Ayurvedic Supplements for Liver Detox & Wellness',
      description: 'Shop ArvinPlus™ research-backed ayurvedic supplements for liver detox, immunity, bone health and vitality. GMP certified, FSSAI approved, third-party lab tested. Free shipping across India on orders above ₹999.',
      keywords: 'ayurvedic supplements, liver detox capsules, milk thistle, immunity boost, bone health supplements, natural wellness, ArvinPlus, herbal supplements India',
      url: 'https://arvinplus.in',
      image: '/assets/arvin-white.png',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is ArvinPlus™?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'ArvinPlus™ is a premium ayurvedic supplement brand based in Dehradun, India. We craft research-backed formulations for liver detox, immunity, bone health, vitamins and minerals, and overall vitality — made in GMP-certified, FSSAI-approved facilities.',
              },
            },
            {
              '@type': 'Question',
              name: 'Are ArvinPlus supplements safe?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Every ArvinPlus™ supplement is manufactured under Good Manufacturing Practices (GMP), is ISO 9001:2015 compliant, FSSAI approved, and every batch is third-party laboratory tested for purity, potency and safety.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I take ArvinPlus supplements?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Follow the dosage directions printed on each product label. For best results, take your supplements consistently at the same time each day and consult your physician before starting any new supplement, especially if you are pregnant, nursing or on medication.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does it take to see results?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most customers notice improvements within 4–8 weeks of consistent use. Results depend on your lifestyle, diet and individual health condition. ArvinPlus™ formulations use clinically-supported ingredient strengths for real, lasting results.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do you offer free shipping?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, ArvinPlus™ offers free shipping across India on orders above ₹999. Orders are processed within 1–2 business days and typically delivered within 5–7 business days.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I contact ArvinPlus customer support?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can reach the ArvinPlus™ support team by email at support@arvinplus.in or by phone at +91 99906 96316, Monday to Saturday. We are happy to help with product selection, orders, shipping and returns.',
              },
            },
          ],
        },
      ],
    });
  }
}
