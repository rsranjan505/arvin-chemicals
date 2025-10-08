import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../../layouts/hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {}
