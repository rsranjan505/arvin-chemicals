import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAuthService } from '../../../services/auth/customer-auth.service';

@Component({
  selector: 'app-account-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.css',
})
export class AccountLoginComponent implements OnDestroy {
  private auth = inject(CustomerAuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  step: 'email' | 'otp' = 'email';

  email = '';
  otp = '';

  loading = false;
  error = '';
  infoMessage = '';
  emailMasked = '';
  requireResend = false;

  resendSeconds = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnDestroy() {
    this.stopTimer();
  }

  async sendOtp() {
    const value = this.email.trim();
    if (!this.isValidEmail(value)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.infoMessage = '';

    const result = await this.auth.requestOtp(value);

    this.loading = false;

    if (!result.ok) {
      this.error = result.message;
      return;
    }

    this.emailMasked = result.emailMasked ?? value;
    this.step = 'otp';
    this.otp = '';
    this.requireResend = false;
    this.infoMessage = `We sent a 6-digit code to ${result.emailMasked}. It is valid for 10 minutes.`;
    this.startResendTimer(30);
  }

  async verifyOtp() {
    if (this.otp.length !== 6 || !/^\d{6}$/.test(this.otp)) {
      this.error = 'Please enter the 6-digit code.';
      return;
    }

    this.loading = true;
    this.error = '';

    const result = await this.auth.verifyOtp(this.email.trim(), this.otp);

    if (!result.ok) {
      this.loading = false;
      this.error = result.message;
      this.requireResend = !!result.requireResend;
      if (result.requireResend) {
        this.otp = '';
      }
      return;
    }

    this.stopTimer();
    await this.auth.refreshCustomer();

    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    this.router.navigateByUrl(redirect && redirect.startsWith('/') ? redirect : '/account');
  }

  resendOtp() {
    if (this.resendSeconds > 0) return;
    this.sendOtp();
  }

  changeEmail() {
    this.stopTimer();
    this.step = 'email';
    this.otp = '';
    this.error = '';
    this.infoMessage = '';
  }

  onOtpInput(event: Event, index?: number) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');

    if (index === undefined) {
      this.otp = digits.slice(0, 6);
      return;
    }

    // Single-character boxes
    const chars = this.otp.split('');
    chars[index] = digits.charAt(digits.length - 1) ?? '';
    this.otp = chars.join('').slice(0, 6);

    if (digits && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      next?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prev?.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    this.otp = text.replace(/\D/g, '').slice(0, 6);
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  private startResendTimer(seconds: number) {
    this.resendSeconds = seconds;
    this.stopTimer();
    this.timer = setInterval(() => {
      this.resendSeconds = Math.max(0, this.resendSeconds - 1);
      if (this.resendSeconds === 0) this.stopTimer();
    }, 1000);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
