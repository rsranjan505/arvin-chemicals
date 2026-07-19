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
          '/assets/products/zinc1.png',
          '/assets/products/zinc2.png',
          '/assets/products/zinc3.png',
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
          '/assets/products/iron1.png',
          '/assets/products/iron.png',
          '/assets/products/iron2.png',
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
          '/assets/products/vitamin1.png',
          '/assets/products/vitamin2.png',
          '/assets/products/vitamin3.png',
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
      {
        name: 'Men\'s Multivitamin',
        subtitle: 'Whole Food Multivitamin with Essential Vitamins A, B, C, D, E & Iron, Zinc, Magnesium',
        slug: 'mens-multivitamin',
        price: 599,
        capsule: 60,
        rating: 4.5,
        image: '/assets/products/mens_multivitamin.png',
        images: ['/assets/products/mens_multivitamin.png'],
        desc: 'Multivitamin Tablets for Men with Whole Food Extracts. Provides essential nutrients for immunity and energy support, enhances nerve health, and supports daily wellness. A comprehensive daily supplement for men.',
        benefits: [
          'Immunity Support',
          'Nerve Health',
          'Daily Health',
          'Supports Energy & Immunity'
        ],
      },
      {
        name: 'Potassium Citrate',
        subtitle: 'Supports Kidney Health & Electrolyte Balance',
        slug: 'potassium-citrate',
        price: 679,
        capsule: 120,
        rating: 4.4,
        image: '/assets/products/potassium_citrate.png',
        images: ['/assets/products/potassium_citrate.png'],
        desc: 'Potassium Citrate 120 Vegetable Capsules formulated to provide muscle & nerve support, promote kidney health, and maintain optimal electrolyte balance in the body.',
        benefits: [
          'Muscle & Nerve Support',
          'Kidney Health Support',
          'Electrolyte Balance'
        ],
      },
      {
        name: 'Selenium+',
        subtitle: '40mcg Superior Absorption Formula',
        slug: 'selenium-plus',
        price: 499,
        capsule: 60,
        rating: 4.6,
        image: '/assets/products/selenium_plus.png',
        images: ['/assets/products/selenium_plus.png'],
        desc: 'Selenium+ Capsules 40mcg Superior Absorption Formula. These vegetarian capsules are designed to provide antioxidant defense, promote thyroid health, and ensure robust immunity and cellular protection.',
        benefits: [
          'Antioxidant Defense',
          'Thyroid Health & Cellular Protection',
          'Robust Immunity',
          'Supports Thyroid & Antioxidant Health'
        ],
      },
      {
        name: 'Vitamin B1 Thiamine',
        subtitle: 'Supports Energy Metabolism, Nerve & Heart Health',
        slug: 'vitamin-b1-thiamine',
        price: 549,
        capsule: 120,
        rating: 4.7,
        image: '/assets/products/vitamin_B1_thiamine.png',
        images: ['/assets/products/vitamin_B1_thiamine.png'],
        desc: 'Vitamin B1 Thiamine 120 Veg Capsules. Expertly formulated to support nerve health, enhance energy metabolism, and promote healthy heart function for overall vitality.',
        benefits: [
          'Nerve Health',
          'Energy Metabolism',
          'Heart Function',
          'Supports Energy Metabolism, Nerve & Heart Health'
        ],
      },
      {
        name: 'Weightwise Burner Pro Advanced',
        subtitle: 'Supports Fat Burn & Metabolism for Weight Loss',
        slug: 'weightwise-burner-pro-advanced',
        price: 495,
        capsule: 60,
        rating: 4.3,
        image: '/assets/products/weightwise_burner_pro_advanced.png',
        images: ['/assets/products/weightwise_burner_pro_advanced.png'],
        desc: 'Weightwise Burner Pro Advanced Tablet for Weight Management. Powerfully formulated with L-Carnitine, Garcinia Cambogia & Green Coffee Extract to support natural fat burning and metabolism.',
        benefits: [
          'Supports Metabolism & Fat Burn',
          'With L-Carnitine & Garcinia',
          'Green Coffee Metabolism'
        ],
      },
      {
        name: 'Alpha Lipoic Acid',
        subtitle: 'Powerful Antioxidant for Nerve Health & Glucose Metabolism',
        slug: 'alpha-lipoic-acid',
        price: 849,
        capsule: 60,
        rating: 4.5,
        image: '/assets/products/alpha_lipoic_acid.png',
        images: ['/assets/products/alpha_lipoic_acid.png'],
        desc: 'Alpha Lipoic Acid (ALA) 60 Veg. Capsules. A powerful antioxidant formula designed to deliver superior nerve health support, promote antioxidant defense, and maintain healthy glucose metabolism. Gluten-Free and Non-GMO.',
        benefits: [
          'Powerful Antioxidant',
          'Nerve Health Support',
          'Glucose Metabolism'
        ],
      },
      {
        name: 'Berberine',
        subtitle: 'with Milk Thistle (Berberis 95%)',
        slug: 'berberine',
        price: 899,
        capsule: 60,
        rating: 4.6,
        image: '/assets/products/berberine.png',
        images: ['/assets/products/berberine.png'],
        desc: 'Berberine 95% with Milk Thistle 750mg Veg. Capsules. A dual-action supplement that supports effective weight management, helps balance glucose levels, and promotes optimal liver health.',
        benefits: [
          'Glucose Balance',
          'Weight Management',
          'Liver Health'
        ],
      },
      {
        name: 'Biotin+',
        subtitle: '10,000 mcg Vitamin B7 (Plant-Based)',
        slug: 'biotin-plus',
        price: 759,
        capsule: 60,
        rating: 4.8,
        image: '/assets/products/biotinplus.png',
        images: ['/assets/products/biotinplus.png'],
        desc: 'Biotin+ Tablets featuring 10,000 mcg of plant-based Vitamin B7. Specially formulated to support natural hair growth, improve skin hydration, and reinforce nail strength for both men and women.',
        benefits: [
          'Hair Growth',
          'Skin Hydration',
          'Nail Strength',
          'Supports Hair, Skin & Nail Health'
        ],
      },
      {
        name: 'Chromium Picolinate',
        subtitle: 'Support Glucose Metabolism (High Absorption)',
        slug: 'chromium-picolinate',
        price: 499,
        capsule: 120,
        rating: 4.4,
        image: '/assets/products/chromium_picolinate.png',
        images: ['/assets/products/chromium_picolinate.png'],
        desc: 'Chromium Picolinate 120 Capsules. An advanced, high-absorption formula designed to effectively support glucose metabolism and provide comprehensive metabolic support. Non-GMO and Gluten-Free.',
        benefits: [
          'Supports Glucose Metabolism',
          'High Absorption',
          'Metabolic Support'
        ],
      },
      {
        name: 'Melatonin',
        subtitle: '3mg - Promotes Restful Sleep & Relaxation',
        slug: 'melatonin',
        price: 499,
        capsule: 120,
        rating: 4.5,
        image: '/assets/products/melatonin.png',
        images: ['/assets/products/melatonin.png'],
        desc: 'Melatonin 3mg 120 Vegetable Capsules. A natural sleep aid designed to regulate your sleep cycle, promote deep and restful sleep, and provide relaxation support for a rejuvenated morning.',
        benefits: [
          'Promotes Sleep',
          'Relaxation Support',
          'Regulates Sleep Cycle',
          'Promotes Restful Sleep & Relaxation'
        ],
      },
      {
        name: 'CoQ10',
        subtitle: 'High Absorption CoQ10 with BioPerine 125mg',
        slug: 'coq10',
        price: 939,
        capsule: 60,
        rating: 4.6,
        image: '/assets/products/coq10.png',
        images: ['/assets/products/coq10.png'],
        desc: 'CoQ10 125mg High Absorption formula with BioPerine. Formulated to support heart health, enhance cellular energy production, and promote optimal brain function for overall vitality.',
        benefits: [
          'Cellular Energy',
          'Heart Health',
          'Brain Function',
          'Supports Heart Health, Cellular Energy, and Brain Function'
        ],
      },
      {
        name: 'Curcumin with Bioperine',
        subtitle: '1310mg (Ultra Pure) Organic Turmeric',
        slug: 'curcumin-with-bioperine',
        price: 1209,
        capsule: 90,
        rating: 4.7,
        image: '/assets/products/curcumin_with_bioperine.png',
        images: ['/assets/products/curcumin_with_bioperine.png'],
        desc: 'Curcumin with Bioperine 1310mg (Ultra Pure) Organic Turmeric capsules. Provides enhanced absorption to effectively support joint health, reduce inflammation, and promote overall well-being.',
        benefits: [
          'Joint Health',
          'Anti-inflammation',
          'Enhanced Absorption',
          'Supports Joint Health, Anti-inflammation & Bioavailability'
        ],
      },
      {
        name: 'Triple Strength Fish Oil Omega-3',
        subtitle: 'EPA 600 | DHA 400 Supplement',
        slug: 'triple-strength-fish-oil',
        price: 543,
        capsule: 60,
        rating: 4.8,
        image: '/assets/products/fish_oil_capsules_omega_3.png',
        images: ['/assets/products/fish_oil_capsules_omega_3.png'],
        desc: 'Ultra-pure Triple Strength Fish Oil Omega-3 for Women and Men. A burpless formula delivering EPA 600 and DHA 400 to optimally support heart, joint, and brain health.',
        benefits: [
          'Heart Health',
          'Joint Support',
          'Brain Function',
          'Optimal Heart & Brain Health'
        ],
      },
      {
        name: 'Glucosamine Chondroitin & MSM',
        subtitle: 'Cartilage, Joint and Bone Health Support',
        slug: 'glucosamine-chondroitin-msm',
        price: 809,
        capsule: 90,
        rating: 4.4,
        image: '/assets/products/glucosamine_chondroitin.png',
        images: ['/assets/products/glucosamine_chondroitin.png'],
        desc: 'Glucosamine Chondroitin & MSM 90 Capsules. A comprehensive joint support formula that aids in cartilage regeneration, improves joint mobility, and supports overall bone health.',
        benefits: [
          'Cartilage Support',
          'Bone Health',
          'Joint Mobility',
          'Supports Cartilage, Joint & Bone Health'
        ],
      },
      {
        name: 'L-Arginine',
        subtitle: 'Ultra Pure Capsules for Stamina, Pump & Energy',
        slug: 'l-arginine',
        price: 709,
        capsule: 120,
        rating: 4.5,
        image: '/assets/products/l_arginin.png',
        images: ['/assets/products/l_arginin.png'],
        desc: 'L-Arginine Ultra Pure 120 Vegetable Capsules. Formulated to support healthy blood flow, enhance muscle pump and stamina during workouts, and promote protein synthesis and vitality.',
        benefits: [
          'Blood Flow Support',
          'Muscle Pump & Stamina',
          'Protein Synthesis & Vitality',
          'Supports Stamina, Pump & Energy'
        ],
      },
      {
        name: 'Liver+',
        subtitle: 'Milk Thistle & N-Acetyl Cysteine 900 mg',
        slug: 'liver-plus',
        price: 1400,
        capsule: 60,
        rating: 4.6,
        image: '/assets/products/liver_plus.png',
        images: ['/assets/products/liver_plus.png'],
        desc: 'Liver+ Natural Detoxification Formula. Contains Milk Thistle & N-Acetyl Cysteine 900 mg to provide a natural body detox, support fatty liver care, and deliver active digestive enzymes.',
        benefits: [
          'Natural Body Detox',
          'Fatty Liver Care',
          'Active Digestive Enzymes',
          'Natural Detoxification Formula'
        ],
      }
    ];

    return this.products;
  }

  getProductBySlug(slug: string) {
    slug = slug.toLowerCase();
    this.products = this.getProducts();
    return this.products.find((p) => p.slug === slug);
  }
}
