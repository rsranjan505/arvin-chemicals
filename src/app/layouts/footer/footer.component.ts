import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  categories = [
    'AR24 Bihar',
    'AR24 Jharkhand',
    'AR24 Uttar Pradesh',
    'AR24 Bharat',
    'AR24 Sports',
    'AR24 Entertainment',
    'AR24 Politics',
    'AR24 Lifestyle',
    'AR24 Technology',
    'AR24 World'
  ];

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



  showPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

}
