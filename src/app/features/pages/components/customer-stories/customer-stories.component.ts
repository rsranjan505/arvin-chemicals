import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Testimonial, TestimonialService } from '../../../../services/testimonial/testimonial.service';

@Component({
  selector: 'app-customer-stories',
  imports: [CommonModule, NgFor],
  templateUrl: './customer-stories.component.html',
  styleUrl: './customer-stories.component.css',
})
export class CustomerStoriesComponent implements OnInit {
  stories: Testimonial[] = [];

  selectedVideo: SafeResourceUrl | null = null;
  selectedName = '';

  constructor(
    private sanitizer: DomSanitizer,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  private async loadTestimonials(): Promise<void> {
    const testimonials = await this.testimonialService.getTestimonials();
    this.stories = testimonials;
  }

  openModal(story: Testimonial) {
    this.selectedName = story.name;
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.toEmbedUrl(story.video_url)
    );
  }

  closeModal() {
    this.selectedVideo = null;
    this.selectedName = '';
  }

  private toEmbedUrl(videoUrl: string): string {
    const videoId = this.extractVideoId(videoUrl);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  private extractVideoId(videoUrl: string): string {
    const watchMatch = videoUrl.match(/[?&]v=([\w-]{11})/);
    if (watchMatch) return watchMatch[1];
    const youtuBeMatch = videoUrl.match(/youtu\.be\/([\w-]{11})/);
    if (youtuBeMatch) return youtuBeMatch[1];
    const embedMatch = videoUrl.match(/\/embed\/([\w-]{11})/);
    if (embedMatch) return embedMatch[1];
    return videoUrl;
  }
}