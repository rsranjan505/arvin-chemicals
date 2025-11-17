import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

 contactForm: FormGroup;

/**
 * Constructor for ContactUsComponent.
 * Initializes the contact form with required fields: name, email, phone, and message.
 * @param fb The FormBuilder service.
 */

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
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
