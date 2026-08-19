import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { resolveImageUrl } from '../../utils/image-url.util';

export interface Testimonial {
  id: number;
  name: string;
  image: string | null;
  image_url: string | null;
  video_url: string;
}

export interface TestimonialsResponse {
  success: boolean;
  testimonials: Testimonial[];
}

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  async getTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`${environment.apiUrl}/api/storefront/testimonials`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    const data = (await res.json()) as TestimonialsResponse;

    if (!res.ok) {
      return [];
    }

    return (data.testimonials ?? []).map((t) => ({
      ...t,
      image_url: resolveImageUrl(t.image_url),
    }));
  }
}