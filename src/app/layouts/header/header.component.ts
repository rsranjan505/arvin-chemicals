import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { NotificationComponent } from '../components/notification/notification.component';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-header',
  imports: [
    TopNavComponent,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NotificationComponent,
    NgFor,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'scaleY(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scaleY(0.8)' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isMobileOpen = false;
  // constructor(private eRef: ElementRef) {}

  private newsService = inject(NewsService);
  private eRef = inject(ElementRef);
  public router = inject(Router);

  currentUrl = signal(this.router.url);

  categories: any = [];

  isMobileDropdownuOpen = false;

  dropdownOpen: any = {};

  iSbiharLink = false;

  toggleDropdown(menu: 'bihar' | 'dharm') {
    // Close others
    for (const key of Object.keys(this.dropdownOpen)) {
      if (key !== menu) this.dropdownOpen[key] = false;
    }
    // Toggle current
    this.dropdownOpen[menu] = !this.dropdownOpen[menu];
  }

  ngOnInit(): void {
    this.newsService.getAllCategories().subscribe((data: any[]) => {
      const mapping = this.getHeaderCategories();
      // Filter only those present in API response
      // Categories to exclude
      const exclude = ['बिहार समाचार', 'राजनीति और शासन', 'मनोरंजन और सिनेमा'];

      // Match + merge hindi_slug
      this.categories = mapping
        .filter(
          (cat) =>
            data.some((d) => d.name === cat.en) && !exclude.includes(cat.hi)
        )
        .map((cat) => {
          const matched = data.find((d) => d.name === cat.en);
          return {
            ...cat,
            hindi_slug: matched?.hindi_slug || null, // attach from API
          };
        });

      this.categories.forEach((cat: any) => {
        if (this.currentUrl().includes(cat.hindi_slug)) {
          this.iSbiharLink = true;
        }
      });
    });
  }

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileMenu() {
    this.isMobileOpen = false;
  }

  toggleMobileDropdownu() {
    this.isMobileDropdownuOpen = !this.isMobileDropdownuOpen;
  }

  // Detect clicks outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMobileOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isMobileOpen = false;
    }
    if (
      this.dropdownOpen['bihar'] &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.dropdownOpen = { bharat: false, dharm: false };
    }
  }

  getHeaderCategories = () => {
    return [
      { hi: 'बिहार समाचार', en: 'Bihar News' },
      { hi: 'राजनीति और शासन', en: 'Politics & Governance' },
      { hi: 'शिक्षा और परीक्षाएँ', en: 'Education & Exams' },
      { hi: 'व्यापार और अर्थव्यवस्था', en: 'Business & Economy' },
      { hi: 'टेक्नोलॉजी और नवाचार', en: 'Technology & Innovation' },
      { hi: 'संस्कृति और विरासत', en: 'Culture & Heritage' },
      { hi: 'स्वास्थ्य और जीवनशैली', en: 'Health & Lifestyle' },
      { hi: 'मनोरंजन और सिनेमा', en: 'Entertainment & Cinema' },
      { hi: 'खेल और प्रतियोगिताएँ', en: 'Sports & Games' },
      { hi: 'धर्म और आध्यात्मिकता', en: 'Religion & Spirituality' },
      { hi: 'यात्रा और पर्यटन', en: 'Travel & Tourism' },
      { hi: 'अपराध और कानून', en: 'Crime & Law' },
      { hi: 'कृषि और ग्रामीण विकास', en: 'Agriculture & Rural Development' },
      { hi: 'पर्यावरण और जलवायु', en: 'Environment & Climate' },
    ];
  };

  showSearch = false;

  openSearch() {
    this.showSearch = true;
  }

  closeSearch() {
    this.showSearch = false;
  }

  handleSearch(query: string) {
    console.log('Search from child:', query);
    // You can call API here or update parent state
  }
}
