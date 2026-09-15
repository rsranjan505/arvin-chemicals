import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogPostDetail, BlogPostSummary } from '../../../services/blog/blog.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  loading = true;
  failed = false;
  errorMessage = '';

  post: BlogPostDetail | null = null;
  related: BlogPostSummary[] = [];

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  ngOnInit() {
    // Post data is resolved by the route resolver before activation, so it is
    // available synchronously here. SSR / pre-render therefore emits the full
    // article content, meta tags and JSON-LD in the first HTML.
    this.applyPost(this.route.snapshot.data['post'] as BlogPostDetail | null);

    // In-app navigation between posts reuses this instance; only the browser
    // needs to react to subsequent route data changes.
    if (isPlatformBrowser(this.platformId)) {
      this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        this.applyPost(data['post'] as BlogPostDetail | null);
      });
    }
  }

  private applyPost(post: BlogPostDetail | null): void {
    this.loading = false;

    if (!post) {
      this.failed = true;
      this.errorMessage = 'Article not found.';
      this.post = null;
      this.related = [];
      return;
    }

    this.failed = false;
    this.errorMessage = '';
    this.post = post;
    this.related = post.related || [];
    this.applySeo();
  }

  private applySeo() {
    if (!this.post) return;

    const url = `https://arvinplus.in/blog/${this.post.slug}`;

    this.seo.setPageSeo({
      title: this.post.meta_title || this.post.title,
      description:
        this.post.meta_description ||
        this.post.excerpt ||
        `${this.post.title} — read on the ArvinPlus™ wellness blog.`,
      keywords: this.post.category
        ? `${this.post.title.toLowerCase()}, ${this.post.category.name.toLowerCase()}, wellness blog, ayurvedic wellness, ArvinPlus`
        : `${this.post.title.toLowerCase()}, wellness blog, ayurvedic wellness, ArvinPlus`,
      image: this.post.cover_url || undefined,
      url,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: this.post.title,
          description: this.post.excerpt,
          image: this.post.cover_url,
          datePublished: this.post.published_at,
          author: {
            '@type': 'Person',
            name: this.post.author?.name || 'ArvinPlus Team',
            url: 'https://arvinplus.in/about-us',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArvinPlus™',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arvinplus.in/assets/arvin-white.png',
            },
          },
          mainEntityOfPage: url,
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
              name: 'Blog',
              item: 'https://arvinplus.in/blog',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: this.post.title,
              item: url,
            },
          ],
        },
      ],
    });
  }
}