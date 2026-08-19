
import { CommonModule } from '@angular/common';
import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent  {

  slides = [
    {
      image: 'assets/hero/bg1.png',
      title: 'Welcome to ArvinPlus',
      subtitle: 'Your trusted partner for premium ayurvedic health supplements.',
      button: 'Explore More'
    },
    {
      image: 'assets/hero/bg2.png',
      title: 'Research-Backed Ayurvedic Supplements',
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

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

}
