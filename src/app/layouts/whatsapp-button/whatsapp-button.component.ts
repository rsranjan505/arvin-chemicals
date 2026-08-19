import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css',
})
export class WhatsappButtonComponent {
  readonly waLink = `https://wa.me/919990696316?text=${encodeURIComponent(
    'Hi ArvinPlus™ Team! I have a question about your ayurvedic supplements.'
  )}`;
}
