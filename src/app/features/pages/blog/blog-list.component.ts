import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BlogCategoriesResponse,
  BlogCategory,
  BlogListResponse,
  BlogService,
  BlogPostSummary,
} from '../../../services/blog/blog.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  loading = true;
  failed = false;

  posts: BlogPostSummary[] = [];
  categories: BlogCategory[] = [];
  pagination = { current_page: 1, last_page: 1, total: 0 };

  activeCategory = '';
  currentPage = 1;

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Health & Wellness Blog',
      description:
        'Evidence-backed articles on liver detox, gut health, immunity, sleep and beauty-from-within from the ArvinPlus™ wellness team. Ayurvedic wellness tips for a healthier India.',
      keywords:
        'health blog, wellness articles, liver health tips, gut health, immunity boosters, ayurvedic wellness, ArvinPlus blog',
      url: 'https://arvinplus.in/blog',
    });

    // API calls run in the browser only; SSR renders the loading state.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    Promise.all([this.loadCategories(), this.loadPosts()]);
  }

  private async loadCategories() {
    const res: BlogCategoriesResponse = await this.blogService.getCategories();
    if (res.success) {
      this.categories = res.categories;
    }
  }

  async loadPosts() {
    this.loading = true;
    const res: BlogListResponse = await this.blogService.getPosts(this.currentPage, this.activeCategory);
    this.loading = false;

    if (res.success) {
      this.posts = res.posts;
      this.pagination = res.pagination;
      this.failed = false;
    } else {
      this.failed = true;
    }
  }

  selectCategory(slug: string) {
    this.activeCategory = slug;
    this.currentPage = 1;
    this.loadPosts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.pagination.last_page || page === this.currentPage) return;
    this.currentPage = page;
    this.loadPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get pageNumbers(): number[] {
    const last = this.pagination.last_page;
    const current = this.currentPage;
    const pages: number[] = [];

    for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
      pages.push(i);
    }

    return pages;
  }
}