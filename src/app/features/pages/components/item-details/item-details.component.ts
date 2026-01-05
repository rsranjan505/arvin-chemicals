import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  constructor(private route: ActivatedRoute) {}

  private productService = inject(ProductService);

  product: any | null;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (!slug) return;

      this.product = {
        ...this.productService.getProductBySlug(slug),

        tags: [
          'Detoxification',
          'Digestive Issues',
          'Fatty Liver',
          'Hormonal Imbalance',
          'Milk Thistle',
          'N-Acetyl Cysteine',
          'Pigmentation',
          'Skin Diseases',
        ],
      };
      console.log('product:', this.product);
    });
  }

  // @Input() product = {
  //   name: 'Liver Detox',
  //   subtitle: 'Fatty Liver Detox & Cleanse Capsules for Optimum Liver Health',
  //   price: 1333.0,
  //   discount: 10,
  //   description:
  //     'ARVIN PLUS+ Liver Detox capsules are crafted with powerful natural ingredients like Organic Milk Thistle (Silymarin Extract 80%), Beetroot, Dandelion, and N-Acetyl Cysteine to support optimal liver health.',
  //   benefits: ['Pigmentation', 'Liver & Skin Health', 'Alcohol Detox'],
  //   image: 'assets/products/p1.jpeg', // adjust path as needed
  //   tags: [
  //     'Detoxification',
  //     'Digestive Issues',
  //     'Fatty Liver',
  //     'Hormonal Imbalance',
  //     'Milk Thistle',
  //     'N-Acetyl Cysteine',
  //     'Pigmentation',
  //     'Skin Diseases',
  //   ],
  //   images: [
  //     'assets/products/p1.jpeg',
  //     'assets/products/p1.jpeg',
  //     'assets/products/p1.jpeg',
  //     'assets/products/p1.jpeg',
  //   ],
  // };

  description = [
    'Having potent antioxidant properties is used to prevent liver toxicity by normalizing liver enzymes.',
    'Milk thistle intake can provide prophylactic effects against toxin-induced liver disease, alcohol-related liver disease, and viral liver disease. This ingredient also has an anti-inflammatory effect and reduces liver enzyme levels. It contains anti-fibrotic properties.',
    'NAC has a liver protective effect which helps in the improvement of liver histology, reduction of enlarged spleen size, controlled elevated liver enzyme level, and improvement in fatty liver.',
  ];

  notes = [
    'If you ever experience any signs of detoxification (caused by a high toxic load), take activated charcoal along with it.',
  ];
}
