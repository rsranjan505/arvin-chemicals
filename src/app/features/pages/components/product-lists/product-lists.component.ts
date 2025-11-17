import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-lists',
  imports: [NgFor,NgIf, RouterLink],
  templateUrl: './product-lists.component.html',
  styleUrl: './product-lists.component.css'
})
export class ProductListsComponent {

    loading = true;

  products = [
    {
      name: 'Liver Detox',
      price: 1333,
      emi: 444,
      rating: 4.5,
      img: '/assets/products/p1.jpeg'
    },
    {
      name: 'Vitamin B12 Tablets',
      price: 710,
      emi: 237,
      rating: 4.8,
      img: '/assets/products/p1.jpeg'
    },
    {
      name: 'Magnesium Relax',
      price: 799,
      emi: 266,
      rating: 4.2,
      img: '/assets/products/p1.jpeg'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1200);
  }

  getStars(rating: number) {
    return Array(5).fill(0).map((_, i) => (i + 1 <= rating));
  }
}
