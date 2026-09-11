import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerAuthService } from '../../../services/auth/customer-auth.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-account-layout',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.css',
})
export class AccountLayoutComponent implements OnInit {
  private auth = inject(CustomerAuthService);
  private router = inject(Router);
  private seo = inject(SeoService);

  customer = this.auth.customer;

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'My Account',
      description: 'Manage your ArvinPlus™ account — track orders, view order history and update your profile details.',
      url: 'https://arvinplus.in/account',
      robots: 'noindex, nofollow',
    });
    this.auth.refreshCustomer();
  }

  initials(): string {
    const name = this.customer()?.name ?? '';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p.charAt(0).toUpperCase()).join('') || 'A';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
