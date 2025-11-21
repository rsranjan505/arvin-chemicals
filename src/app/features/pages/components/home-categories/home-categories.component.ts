import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home-categories',
  imports: [NgFor, CommonModule],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.css'
})
export class HomeCategoriesComponent implements OnInit {

  categories: { name: string; icon: SafeHtml }[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.categories = [
      {
        name: "Women's Health",
        icon: this.sanitize(`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white"
               viewBox="0 0 64 64" class="w-20 h-15">
            <circle cx="32" cy="20" r="10" stroke-width="2"/>
            <path stroke-width="2" stroke-linecap="round" d="M32 30v10M32 40v8M26 48h12"/>
          </svg>
        `)
      },
      {
        name: "Weight Management",
        icon: this.sanitize(`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white"
               viewBox="0 0 64 64" class="w-20 h-15">
            <rect x="20" y="14" width="24" height="36" rx="8" stroke-width="2"/>
            <path stroke-width="2" d="M26 26h12M26 34h12M32 14v4"/>
          </svg>
        `)
      },
      {
        name: "Digestive Health",
        icon: this.sanitize(`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white"
               viewBox="0 0 64 64" class="w-20 h-15">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M32 14c8 0 12 6 12 12v4c0 6-4 12-12 12s-12-6-12-12v-4c0-6 4-12 12-12zM32 24v10"/>
          </svg>
        `)
      },
      {
        name: "Sexual Health",
        icon: this.sanitize(`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white"
               viewBox="0 0 64 64" class="w-20 h-15">
            <circle cx="24" cy="24" r="8" stroke-width="2"/>
            <circle cx="40" cy="40" r="8" stroke-width="2"/>
            <path stroke-width="2" d="M29 29l6 6"/>
          </svg>
        `)
      },
      {
        name: "Lung Health",
        icon: this.sanitize(`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white"
               viewBox="0 0 64 64" class="w-20 h-15">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M32 14v16m0 0l-8 8v12M32 30l8 8v12M16 38v-8a16 16 0 0132 0v8"/>
          </svg>
        `)
      },
    ];
  }

  sanitize(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
