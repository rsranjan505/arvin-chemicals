import { Component, inject } from '@angular/core';
import { ItemDetailsComponent } from '../components/item-details/item-details.component';
import { SeoService } from 'src/app/services/seo/seo.service';
import { ProductSummary } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  imports: [ItemDetailsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  private seo = inject(SeoService);

  ngOnInit() {

    this.seo.setPageSeo({
      title: 'Our Products - ArvinPlus™ Health Supplements',
      description: 'Explore the full ArvinPlus™ collection of research-backed health supplements — Liver Detox, Zinc, Iron, Vitamin K2 MK-7, Magnesium Glycinate, Selenium Plus & more. GMP certified, FSSAI approved, free shipping on orders above ₹999.',
      keywords: 'health supplements, iron supplement tablets, iron with vitamin B12 folic acid and zinc tablets, vitamin K2 MK-7, zinc tablets for men and women, zinc supplement India,vitamin B12 supplement, liver detox capsules, magnesium glycinate, selenium plus, ArvinPlus products,supplements for everyday health and wellness, buy health supplements online India, best health supplements India, affordable health supplements India, natural wellness, herbal supplements India' ,
      url: 'https://arvinplus.in/our-collections',
      type: 'website',
    });
  }
}
