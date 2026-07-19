import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-term-condition',
  imports: [],
  templateUrl: './term-condition.component.html',
  styleUrl: './term-condition.component.css'
})
export class TermConditionComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Terms & Conditions | ArvinPlus™',
      description: 'Read the Terms & Conditions for using ArvinPlus™ website and purchasing our ayurvedic supplements. Understand product information, intellectual property, and liability.',
      keywords: 'terms and conditions ArvinPlus, supplement purchase terms, ayurvedic product policy, ArvinPlus terms of service',
      url: 'https://arvinplus.in/terms-conditions',
    });
  }
}
