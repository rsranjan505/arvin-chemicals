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
  robots?: string;
  jsonLd?: object | object[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private siteName = 'ArvinPlus™ - Premium health supplements';
  private defaultImage = '/assets/arvin-white.png';
  private baseUrl = 'https://arvinplus.in';
  private addedJsonLdScripts: HTMLScriptElement[] = [];

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setPageSeo(data: SeoData) {
    // Strip any brand suffix so we never produce "Page | ArvinPlus™ | ArvinPlus™".
    const cleanTitle = data.title.trim().replace(/\s*\|\s*ArvinPlus™\s*$/i, '');
    this.title.setTitle(`${cleanTitle} | ArvinPlus™`);

    this.meta.updateTag({ name: 'description', content: data.description });

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    const canonicalUrl = data.url || this.baseUrl;
    const imageUrl = this.toAbsoluteUrl(data.image || this.defaultImage);

    this.meta.updateTag({ property: 'og:title', content: data.ogTitle || cleanTitle });
    this.meta.updateTag({ property: 'og:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });

    this.meta.updateTag({ name: 'twitter:card', content: data.twitterCard || 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.ogTitle || cleanTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:site', content: '@ArvinPlus' });

    const robots = data.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    this.meta.updateTag({ name: 'robots', content: robots });

    // Local / GEO signals for our Dehradun (Uttarakhand, India) facility.
    this.meta.updateTag({ name: 'geo.region', content: 'IN-UT' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Dehradun, Uttarakhand, India' });
    this.meta.updateTag({ name: 'geo.position', content: '30.3165;78.0322' });
    this.meta.updateTag({ name: 'ICBM', content: '30.3165, 78.0322' });

    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

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

  private toAbsoluteUrl(url: string): string {
    if (!url) return this.toAbsoluteUrl(this.defaultImage);
    if (/^https?:\/\//i.test(url)) return url;
    return `${this.baseUrl}${url.startsWith('/') ? url : '/' + url}`;
  }
}
