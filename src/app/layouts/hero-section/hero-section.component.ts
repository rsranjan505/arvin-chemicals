
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
      subtitle: 'Your trusted partner for premium Health Suppliments.',
      button: 'Explore More'
    },
    {
      image: 'assets/hero/bg2.png',
      title: 'High-Quality Health Suppliments',
      subtitle: 'Delivering excellence with advanced formulations.',
      button: 'View Products'
    },
    {
      image: 'assets/hero/bg3.png',
      title: 'Trusted by Leading Industries',
      subtitle: 'Reliability. Quality. Performance.',
      button: 'About Us'
    },
    {
      image: 'assets/hero/bg4.png',
      title: 'Innovating for a Better Tomorrow',
      subtitle: 'Modern Health Suppliments for modern businesses.',
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
