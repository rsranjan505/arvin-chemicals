import { CommonModule } from '@angular/common';
import { Component, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../../services/seo/seo.service';

@Component({
  selector: 'app-item-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  private productService = inject(ProductService);

  product: any | null;

  selectedImage: string = '';

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
      this.selectedImage = this.product?.image || '';

      if (this.product) {
        this.seo.setPageSeo({
          title: `${this.product.name} | ArvinPlus™`,
          description: `Buy ${this.product.name} — ${this.product.subtitle}. ${this.product.desc?.substring(0, 120)} Free shipping. GMP certified.`,
          keywords: `${this.product.name.toLowerCase()}, ${(this.product.benefits || []).slice(0, 3).join(', ').toLowerCase()}, ayurvedic supplements, ArvinPlus`,
          image: this.product.image,
          url: `https://arvinplus.in/products/${this.product.slug}`,
          type: 'product',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: this.product.name,
            description: this.product.subtitle,
            image: this.product.image,
            offers: {
              '@type': 'Offer',
              price: this.product.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
            brand: {
              '@type': 'Brand',
              name: 'ArvinPlus™',
            },
          },
        });
      }
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  zoomStyle: { transform: string; transformOrigin?: string } = { transform: 'scale(1)' };

  onMouseMove(e: MouseEvent) {
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.zoomStyle = {
      transform: `scale(2.5)`,
      transformOrigin: `${x}% ${y}%`,
    };
  }

  onMouseLeave() {
    this.zoomStyle = { transform: 'scale(1)' };
  }

  isModalOpen = false;
  modalSelectedImage: string = '';
  modalZoomed = false;

  openModal() {
    this.modalSelectedImage = this.selectedImage;
    this.modalZoomed = false;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalZoomed = false;
    document.body.style.overflow = '';
  }

  toggleModalZoom() {
    this.modalZoomed = !this.modalZoomed;
  }

  selectModalImage(img: string) {
    this.modalSelectedImage = img;
    this.modalZoomed = false;
  }

  get currentIndex(): number {
    return this.product?.images?.indexOf(this.modalSelectedImage) ?? 0;
  }

  prevImage() {
    const images = this.product?.images;
    if (!images?.length) return;
    const idx = (this.currentIndex - 1 + images.length) % images.length;
    this.modalSelectedImage = images[idx];
    this.modalZoomed = false;
  }

  nextImage() {
    const images = this.product?.images;
    if (!images?.length) return;
    const idx = (this.currentIndex + 1) % images.length;
    this.modalSelectedImage = images[idx];
    this.modalZoomed = false;
  }

  onModalBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onModalKeydown(e: KeyboardEvent) {
    if (!this.isModalOpen) return;
    if (e.key === 'Escape') this.closeModal();
    if (e.key === 'ArrowLeft') this.prevImage();
    if (e.key === 'ArrowRight') this.nextImage();
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
