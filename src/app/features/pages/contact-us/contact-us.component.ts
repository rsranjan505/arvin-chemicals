import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact/contact.service';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

 contactForm: FormGroup;
 submitting = false;
 submitted = false;
 submitError: string | null = null;

/**
 * Constructor for ContactUsComponent.
 * Initializes the contact form with required fields: name, email, phone, and message.
 * @param fb The FormBuilder service.
 */

  constructor(private fb: FormBuilder, private seo: SeoService, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[\d\s-]{7,15}$/)]],
      subject: ['General Enquiry', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Contact Us',
      description: 'Contact ArvinPlus™ for health supplement inquiries, orders, bulk purchases or support. Call +91 99906 96316 or email support@arvinplus.in. Office: Lane No-1, Nathanpur Road, Dehradun (Uttarakhand) 248005, India.',
      keywords: 'contact ArvinPlus, health supplement inquiry, order supplements India, bulk herbal products, ArvinPlus customer support',
      url: 'https://arvinplus.in/contact-us',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact ArvinPlus™',
        url: 'https://arvinplus.in/contact-us',
        mainEntity: {
          '@type': 'Organization',
          '@id': 'https://arvinplus.in/#organization',
          name: 'ArvinPlus™',
          telephone: '+91-99906-96316',
          email: 'support@arvinplus.in',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Lane No-1, Nathanpur Road',
            addressLocality: 'Dehradun',
            addressRegion: 'Uttarakhand',
            postalCode: '248005',
            addressCountry: 'IN',
          },
        },
      },
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitted = false;
    this.submitError = null;

    const result = await this.contactService.submit(this.contactForm.value);

    this.submitting = false;

    if (result.success) {
      this.submitted = true;
      this.contactForm.reset({ subject: 'General Enquiry' });
      this.contactForm.markAsPristine();
      this.contactForm.markAsUntouched();
    } else {
      this.submitError = result.message;
    }
  }
}
