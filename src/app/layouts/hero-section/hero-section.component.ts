
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {

  slides = [
    {
      image: 'assets/hero/bg1.png',
      title: 'Welcome to ArvinPlus',
      subtitle: 'Your trusted partner for premium health supplements.',
      button: 'Explore More'
    },
    {
      image: 'assets/hero/bg2.png',
      title: 'Research-Backed health supplements',
      subtitle: 'Delivering excellence with GMP-certified, FSSAI-approved formulations.',
      button: 'View Products'
    },
    {
      image: 'assets/hero/bg3.png',
      title: 'Trusted by 10,000+ Customers',
      subtitle: 'Reliability. Quality. Purity. Real wellness results across India.',
      button: 'About Us'
    },
    {
      image: 'assets/hero/bg4.png',
      title: 'Innovating for a Better Tomorrow',
      subtitle: 'Liver detox, immunity, bone health and vitality — made simple.',
      button: 'Contact Us'
    }
  ];

  currentIndex = 0;
  private autoSlideInterval: any;
  private touchStartX = 0;
  private touchEndX = 0;
  private isTouchDevice = false;

  @ViewChild('heroContainer') heroContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.startAutoSlide();

    // Pause auto-slide on hover/focus (desktop)
    this.heroContainer?.nativeElement.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.heroContainer?.nativeElement.addEventListener('mouseleave', () => this.startAutoSlide());
    this.heroContainer?.nativeElement.addEventListener('focusin', () => this.stopAutoSlide());
    this.heroContainer?.nativeElement.addEventListener('focusout', () => this.startAutoSlide());
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 8000);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  // Touch event handlers for mobile swipe
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
    this.stopAutoSlide();
  }

  onTouchMove(event: TouchEvent): void {
    // Prevent vertical scroll interference
    const touchX = event.changedTouches[0].screenX;
    const touchY = event.changedTouches[0].screenY;
    const deltaX = Math.abs(touchX - this.touchStartX);
    const deltaY = Math.abs(touchY - event.changedTouches[0].screenY);

    // If horizontal swipe is more dominant, prevent default
    if (deltaX > deltaY && deltaX > 10) {
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
    this.startAutoSlide();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50; // minimum distance for swipe
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide(); // Swipe left - next slide
      } else {
        this.prevSlide(); // Swipe right - previous slide
      }
    }
  }

  // Keyboard navigation for accessibility
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
      this.stopAutoSlide();
      this.startAutoSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }
}
