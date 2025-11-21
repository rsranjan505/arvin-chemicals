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
      name: 'Zinc Tablets',
      subtitle: 'Supports Healthy Immunity',
      slug: 'zinc-tablets',
      price: 1333,
      emi: 444,
      rating: 4.5,
      img: '/assets/products/zinc.png'
    },
    {
      name: 'Iron, Zinc, Folic Acid & Vit B12',
      subtitle: 'Supports Healthy Immunity',
      slug: 'iron-zinc-folic-acid-vit-b12',
      price: 710,
      emi: 237,
      rating: 4.8,
      img: '/assets/products/iron.png'
    },
    {
      name: 'Vitamin D3',
      subtitle: 'Supports Healthy Immunity',
      slug: 'vitamin-d3',
      price: 799,
      emi: 266,
      rating: 4.2,
      img: '/assets/products/vitamin.png'
    },
    {
      name: 'Forever 21',
      subtitle: 'Supports Healthy Immunity',
      slug: 'forever-21',
      price: 710,
      emi: 237,
      rating: 4.8,
      img: '/assets/products/forever24.png'
    },
    {
      name: 'Magnesium',
      subtitle: 'Supports Healthy Immunity',
      slug: 'magnesium',
      price: 799,
      emi: 266,
      rating: 4.2,
      img: '/assets/products/magnesium.png'
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
