import { CommonModule } from '@angular/common';
import { Component, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ProductService,
  ProductDetail,
} from '../../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../../services/seo/seo.service';
import { CartService } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-item-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product: ProductDetail | null = null;

  loading = true;
  notFound = false;

  selectedImage: string = '';

  added = false;

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug');

      if (!slug) return;

      this.loading = true;
      this.notFound = false;

      try {
        const product = await this.productService.getProductBySlug(slug);

        if (!product) {
          this.notFound = true;
          this.product = null;
          return;
        }

        this.product = product;
        const images = product.images?.length
          ? product.images
          : product.image
            ? [product.image]
            : [];
        this.selectedImage = images[0] || '';
        this.setSeo(product, images);
      } catch {
        this.notFound = true;
        this.product = null;
      } finally {
        this.loading = false;
      }
    });
  }

  private setSeo(product: ProductDetail, images: string[]) {
    const url = `https://arvinplus.in/products/${product.slug}`;
    const price = product.sale_price ?? product.price;

    this.seo.setPageSeo({
      title: product.meta_title || `${product.name}`,
      description: `${product.meta_description || `Buy ${product.name} — ${product.subtitle}.`} ${(product.description || '').substring(0, 110)} Free shipping across India. GMP certified, FSSAI approved.`,
      keywords: `${product.name.toLowerCase()}, ${(product.benefits || []).slice(0, 3).join(', ').toLowerCase()}, health supplements, herbal supplements India, ArvinPlus`,
      image: product.image || images[0],
      url,
      type: 'product',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.subtitle,
          sku: product.sku || product.slug,
          image: product.image || images[0],
          brand: {
            '@type': 'Brand',
            name: 'ArvinPlus™',
            url: 'https://arvinplus.in',
          },
          offers: {
            '@type': 'Offer',
            url,
            price,
            priceCurrency: 'INR',
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .slice(0, 10),
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.in_stock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'ArvinPlus™',
            },
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://arvinplus.in',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Our Collections',
              item: 'https://arvinplus.in/our-collections',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: product.name,
              item: url,
            },
          ],
        },
      ],
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart({
      slug: this.product.slug,
      name: this.product.name,
      subtitle: this.product.subtitle,
      price: this.product.sale_price ?? this.product.price,
      capsule: this.product.capsule ?? 0,
      image: this.product.image || (this.product.images?.[0] ?? ''),
    });
    this.added = true;
    setTimeout(() => (this.added = false), 2500);
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
    const images = this.product?.images ?? [];
    return images.indexOf(this.modalSelectedImage);
  }

  prevImage() {
    const images = this.product?.images ?? [];
    if (!images.length) return;
    const idx = (this.currentIndex - 1 + images.length) % images.length;
    this.modalSelectedImage = images[idx];
    this.modalZoomed = false;
  }

  nextImage() {
    const images = this.product?.images ?? [];
    if (!images.length) return;
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

  description = [
    'Having potent antioxidant properties is used to prevent liver toxicity by normalizing liver enzymes.',
    'Milk thistle intake can provide prophylactic effects against toxin-induced liver disease, alcohol-related liver disease, and viral liver disease. This ingredient also has an anti-inflammatory effect and reduces liver enzyme levels. It contains anti-fibrotic properties.',
    'NAC has a liver protective effect which helps in the improvement of liver histology, reduction of enlarged spleen size, controlled elevated liver enzyme level, and improvement in fatty liver.',
  ];

  notes = [
    'If you ever experience any signs of detoxification (caused by a high toxic load), take activated charcoal along with it.',
  ];
}
