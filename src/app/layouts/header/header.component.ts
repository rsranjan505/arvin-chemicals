import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

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

  private cartService = inject(CartService);

  cartCount = 0;

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

  searchOpen = false;

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  closeSearch() {
    this.searchOpen = false;
  }

}
