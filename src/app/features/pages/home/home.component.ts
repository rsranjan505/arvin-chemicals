import { Component } from '@angular/core';
import { HomeCategoriesComponent } from "../components/home-categories/home-categories.component";
import { HeroSectionComponent } from "../../../layouts/hero-section/hero-section.component";
import { ProductListsComponent } from "../components/product-lists/product-lists.component";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HomeCategoriesComponent, HeroSectionComponent, ProductListsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // ✅ must be plural: styleUrls
})
export class HomeComponent {}
