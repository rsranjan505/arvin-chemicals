import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../../services/seo/seo.service';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

 contactForm: FormGroup;

/**
 * Constructor for ContactUsComponent.
 * Initializes the contact form with required fields: name, email, phone, and message.
 * @param fb The FormBuilder service.
 */

  constructor(private fb: FormBuilder, private seo: SeoService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.seo.setPageSeo({
      title: 'Contact Us | ArvinPlus™',
      description: 'Get in touch with ArvinPlus™ for inquiries about our ayurvedic supplements, orders, or bulk purchases. Call +91 99906 96316 or email arvinplus.in@gmail.com.',
      keywords: 'contact ArvinPlus, ayurvedic supplement inquiry, order supplements India, bulk herbal products, ArvinPlus customer support',
      url: 'https://arvinplus.in/contact-us',
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted:', this.contactForm.value);

    alert('Thank you for contacting us! We will get back to you shortly.');

    this.contactForm.reset();
  }
}
