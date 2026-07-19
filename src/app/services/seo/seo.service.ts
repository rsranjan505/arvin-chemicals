import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  jsonLd?: object;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private siteName = 'ArvinPlus™ - Premium Ayurvedic Supplements';
  private defaultImage = '/assets/arvin-white.png';
  private baseUrl = 'https://arvinplus.in';
  private addedJsonLdScripts: HTMLScriptElement[] = [];

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setPageSeo(data: SeoData) {
    this.title.setTitle(`${data.title} | ArvinPlus™`);

    this.meta.updateTag({ name: 'description', content: data.description });

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    this.meta.updateTag({ property: 'og:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ property: 'og:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: data.url || this.baseUrl });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

    this.meta.updateTag({ name: 'twitter:card', content: data.twitterCard || 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image || this.defaultImage });

    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = data.url || this.baseUrl;

    this.addedJsonLdScripts.forEach(s => s.remove());
    this.addedJsonLdScripts = [];

    if (data.jsonLd) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data.jsonLd);
      this.document.head.appendChild(script);
      this.addedJsonLdScripts.push(script);
    }
  }
}
