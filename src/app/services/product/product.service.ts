import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  products: any[] = [];

  getProducts() {
    this.products = [
      {
        name: 'Zinc Tablets',
        subtitle:
          'Essential Mineral for Immune Function, Skin Health, and Antioxidant Defense',
        slug: 'zinc-tablets',
        price: 1089,
        capsule: 120,
        rating: 4.5,
        image: '/assets/products/zinc.png',
        images: [
          '/assets/products/zinc.png',
          '/assets/products/zinc.png',
          '/assets/products/zinc.png',
        ],
        desc: 'As an essential trace mineral, Zinc performs diverse and critical physiological functions, including regulating growth, supporting robust immune system maintenance, and facilitating tissue repair. Functionally, it acts as a structural and regulatory catalyst for the biological activity of numerous enzymes and proteins, while providing cellular defense as an antioxidant and anti-inflammatory agent',
        benefits: [
          'Helps to strengthen the immune system',
          'Aids in immune system fortification',
          'Balances insulin levels in the body',
          'Aids in cellular repair and regeneration',
        ],
      },
      {
        name: 'Iron, Zinc, Folic Acid & Vit B12',
        subtitle: 'Supports blood building & energy boost',
        slug: 'iron-zinc-folic-acid-vit-b12',
        price: 899,
        capsule: 60,
        rating: 4.8,
        image: '/assets/products/iron.png',
        images: [
          '/assets/products/iron.png',
          '/assets/products/iron.png',
          '/assets/products/iron.png',
        ],
        desc: 'Essential nutrients combined in supplements to support red blood cell formation, prevent anemia, and promote overall health. This combination aids in oxygen transport, energy levels, nerve function, immune response, and cell growth and repair. ',
        benefits: [
          'Support blood formation (RBC) ',
          'Boost Immunity',
          'Support overall energy level',
          'Nerve Health, Fetal Health',
        ],
      },
      {
        name: 'Vitamin K2 MK-7',
        subtitle: 'Supports bone & arterial health',
        slug: 'vitamin-k2-mk-7',
        price: 1799,
        capsule: 90,
        rating: 4.2,
        image: '/assets/products/vitamin.png',
        images: [
          '/assets/products/vitamin.png',
          '/assets/products/vitamin.png',
          '/assets/products/vitamin.png',
        ],
        desc: 'We provide Vitamin K2 in its superior, active form: Menaquinone-7 (MK-7). This essential nutrient directs calcium exactly where it needs to go: to your bones for strength, and away from your arteries where it can cause calcification. By keeping arteries resilient and flexible, K2 MK-7 powerfully supports both bone density and cardiovascular health. ',
        benefits: [
          'Bone Strengthening and Density',
          'Promotes heart wellness',
          'Regulates calcium',
          'Promotes Arterial Flexibility',
          'Brain and Nerve Health',
        ],
      },
      {
        name: 'Forever 21',
        subtitle: 'Enhances Vigor, performance & stamina',
        slug: 'forever-21',
        price: 1299,
        capsule: 60,
        rating: 4.8,
        image: '/assets/products/forever24.png',
        images: ['/assets/products/forever24.png', '/assets/products/forever24.png', '/assets/products/forever24.png'],
        desc: 'This natural vitality and rejuvenation formula is      engineered to restore youthful energy and support overall well-being. It   features a powerful herbal blend, including Horny Goat Weed for sexual  health, Maca Root for boosting energy and endurance, and Safed Musli to  support male reproductive health. Use it to naturally balance hormones, increase stamina, and promote long-term wellness. Feel young, stay strong, and boost your vitality. ',
        benefits: [
          'Improves performance & endurance',
          'Improve energy & stamina',
          'Support muscle strength',
          'Promotes bone & joint health',
          'Enhances vigor, performance & stamina',
        ],
      },
      {
        name: 'Magnesium glycinate ',
        subtitle:
          'gentle, high-absorption formula for sleep, muscle and nerve health',
        slug: 'magnesium-glycinate',
        price: 799,
        capsule: 60,
        rating: 4.2,
        image: '/assets/products/magnesium.png',
        images: ['/assets/products/magnesium.png', '/assets/products/magnesium.png', '/assets/products/magnesium.png'],
        desc: 'Magnesium Glycinate Tablets are a premium supplement formulated for superior relaxation and recovery. Utilizing a highly bioavailable chelated form for optimal absorption, these tablets effectively reduce muscle cramps, fatigue, and post-workout soreness. They also promote deep, restful sleep, aid in stress reduction, and support nerve and cognitive health for improved mood and mental clarity. Experience better rest, recovery, and focus with every dose.',
        benefits: [
          'Support relaxation, calm & restful sleep',
          'Support muscle, heart & bone health ',
          'Helps regulate heartbeat and maintain healthy blood pressure',
          'Enhances nerve signaling and reduces neurological discomfort',
        ],
      },
    ];

    return this.products;
  }

  getProductBySlug(slug: string) {
    slug = slug.toLowerCase();
    this.products = this.getProducts();
    return this.products.find((p) => p.slug === slug);
  }
}
