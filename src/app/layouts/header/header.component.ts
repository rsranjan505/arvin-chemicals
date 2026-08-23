import { Component, OnInit, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CustomerAuthService } from '../../services/auth/customer-auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [],
})
export class HeaderComponent implements OnInit {
  mobileOpen = false;
  dropdownOpen = false;
  accountMenuOpen = false;

  private cartService = inject(CartService);
  private router = inject(Router);
  private customerAuth = inject(CustomerAuthService);

  cartCount = 0;

  customer = this.customerAuth.customer;

  @ViewChild('searchInput') desktopSearchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('mobileSearchInput') mobileSearchInput?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.cartService.items$.subscribe((items) => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeMenu() {
    this.mobileOpen = false;
  }

  toggleAccountMenu() {
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  initials(): string {
    const name = this.customer()?.name ?? '';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p.charAt(0).toUpperCase()).join('') || 'A';
  }

  logout() {
    this.accountMenuOpen = false;
    this.customerAuth.logout();
    this.router.navigate(['/']);
  }

  searchOpen = false;
  searchTerm = '';

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      this.closeMenu();
      this.focusInput();
    } else {
      this.searchTerm = '';
    }
  }

  focusInput() {
    setTimeout(() => {
      const el =
        window.innerWidth >= 768 ? this.desktopSearchInput : this.mobileSearchInput;
      el?.nativeElement.focus();
    }, 80);
  }

  submitSearch() {
    const q = this.searchTerm.trim();
    if (!q) {
      this.focusInput();
      return;
    }
    this.router.navigate(['/products'], { queryParams: { q } });
    this.searchOpen = false;
    this.searchTerm = '';
  }

  clearSearchTerm() {
    this.searchTerm = '';
    this.focusInput();
  }

  closeSearch() {
    this.searchOpen = false;
    this.searchTerm = '';
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.searchOpen) {
      this.searchOpen = false;
      this.searchTerm = '';
    }
    this.accountMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.searchOpen) {
      this.searchOpen = false;
      this.searchTerm = '';
    }
    this.accountMenuOpen = false;
  }
}
