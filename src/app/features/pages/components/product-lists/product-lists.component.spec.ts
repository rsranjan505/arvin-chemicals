import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductListsComponent } from './product-lists.component';
import { ProductService } from '../../../../services/product/product.service';

describe('ProductListsComponent', () => {
  let component: ProductListsComponent;
  let fixture: ComponentFixture<ProductListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ProductService,
          useValue: {
            getProducts: () => Promise.resolve([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads products from the service on init', async () => {
    const productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProducts').and.resolveTo([
      {
        id: 1,
        name: 'Zinc Tablets',
        subtitle: 'Immune support',
        slug: 'zinc-tablets',
        price: 1089,
        sale_price: null,
        capsule: 120,
        rating: 4.5,
        image: '/storage/products/zinc.png',
        in_stock: true,
        featured: true,
        best_seller: true,
        new_arrival: false,
        category: 'Immune Support',
      },
    ]);

    await component.load();
    fixture.detectChanges();

    expect(component.products.length).toBe(1);
    expect(component.loading).toBe(false);
  });
});
