import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogListResponse, BlogService, BlogPostSummary } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-home-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-blog.component.html',
  styleUrl: './home-blog.component.css',
})
export class HomeBlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private platformId = inject(PLATFORM_ID);

  loading = true;
  posts: BlogPostSummary[] = [];

  ngOnInit() {
    // API calls only run in the browser; SSR renders the loading state.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.blogService.getPosts(1).then((res: BlogListResponse) => {
      this.loading = false;
      if (res.success) {
        this.posts = res.posts.slice(0, 3);
      }
    });
  }
}