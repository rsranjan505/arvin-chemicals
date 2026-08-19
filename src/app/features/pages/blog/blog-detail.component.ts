import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogPostDetail, BlogService, BlogPostSummary } from '../../../services/blog/blog.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  loading = true;
  failed = false;
  errorMessage = '';

  post: BlogPostDetail | null = null;
  related: BlogPostSummary[] = [];

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (!slug) {
        this.failed = true;
        this.loading = false;
        return;
      }

      this.reset();

      // The API fetch only runs in the browser (SSR renders the loading state).
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.blogService.getPostBySlug(slug).then((res) => {
        this.loading = false;
        if (res.success && res.post) {
          this.post = res.post;
          this.related = res.post.related || [];
          this.applySeo();
        } else {
          this.failed = true;
          this.errorMessage = res.message || 'Post not found.';
        }
      });
    });
  }

  private reset() {
    this.loading = true;
    this.failed = false;
    this.errorMessage = '';
    this.post = null;
    this.related = [];
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