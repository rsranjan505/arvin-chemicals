import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { resolveImageUrl } from '../../utils/image-url.util';

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  cover_url: string | null;
  published_at: string;
  reading_time: number;
  category: BlogCategory | null;
  author: { id: number; name: string } | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  meta_title: string;
  meta_description: string;
  related: BlogPostSummary[];
}

export interface BlogListResponse {
  success: boolean;
  posts: BlogPostSummary[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface BlogCategoriesResponse {
  success: boolean;
  categories: BlogCategory[];
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  async getPosts(page = 1, categorySlug = ''): Promise<BlogListResponse> {
    const params = new URLSearchParams({ page: String(page) });
    if (categorySlug) {
      params.set('category', categorySlug);
    }

    const res = await fetch(`${environment.apiUrl}/api/storefront/blog/posts?${params.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, posts: [], pagination: { current_page: 1, last_page: 1, per_page: 9, total: 0 } };
    }

    return {
      ...data,
      posts: (data.posts ?? []).map((post: BlogPostSummary) => ({
        ...post,
        cover_url: resolveImageUrl(post.cover_url),
      })),
    };
  }

  async getPostBySlug(slug: string): Promise<{ success: boolean; post?: BlogPostDetail; message?: string }> {
    const res = await fetch(`${environment.apiUrl}/api/storefront/blog/posts/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data?.message || 'Post not found.' };
    }

    if (!data.post) {
      return { success: false, message: 'Post not found.' };
    }

    return {
      ...data,
      post: {
        ...data.post,
        cover_url: resolveImageUrl(data.post.cover_url),
        related: (data.post.related ?? []).map((item: BlogPostSummary) => ({
          ...item,
          cover_url: resolveImageUrl(item.cover_url),
        })),
      },
    };
  }

  async getCategories(): Promise<BlogCategoriesResponse> {
    const res = await fetch(`${environment.apiUrl}/api/storefront/blog/categories`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, categories: [] };
    }

    return data;
  }
}