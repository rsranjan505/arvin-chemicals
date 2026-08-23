import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAuthService } from '../../../services/auth/customer-auth.service';

@Component({
  selector: 'app-account-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private auth = inject(CustomerAuthService);
  private router = inject(Router);

  customer = this.auth.customer;

  name = '';
  mobile = '';

  loading = false;
  saved = false;
  error = '';

  ngOnInit() {
    this.name = this.customer()?.name ?? '';
    this.mobile = this.customer()?.mobile ?? '';
    this.auth.refreshCustomer().then(() => {
      this.name = this.customer()?.name ?? '';
      this.mobile = this.customer()?.mobile ?? '';
    });
  }

  async save() {
    this.error = '';
    this.saved = false;

    if (!this.name || this.name.trim().length < 2) {
      this.error = 'Please enter your full name.';
      return;
    }

    if (this.mobile && !/^\d{10}$/.test(this.mobile)) {
      this.error = 'Mobile number must be exactly 10 digits.';
      return;
    }

    this.loading = true;
    const result = await this.auth.updateProfile(this.name.trim(), this.mobile || null);
    this.loading = false;

    if (!result.ok) {
      this.error = result.message;
      return;
    }

    this.saved = true;
    setTimeout(() => (this.saved = false), 3000);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
