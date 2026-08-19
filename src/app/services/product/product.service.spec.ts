import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment';
import { ProductService, ProductSummary, ProductDetail } from './product.service';

const sampleSummary: ProductSummary = {
  id: 1,
  name: 'Zinc Tablets',
  subtitle: 'Immune support',
  slug: 'zinc-tablets',
  price: 1089,
  sale_price: null,
  capsule: 120,
  rating: 4.5,
  image: `${environment.apiUrl}/storage/products/zinc.png`,
  in_stock: true,
  featured: true,
  best_seller: true,
  new_arrival: false,
  category: 'Immune Support',
};

const sampleDetail: ProductDetail = {
  ...sampleSummary,
  sku: 'SKU-ZINC',
  description: 'As an essential trace mineral...',
  short_description: null,
  stock_quantity: 150,
  images: [`${environment.apiUrl}/storage/products/zinc.png`],
  benefits: ['Immune support'],
  specifications: [{ title: 'Servings', description: '120 capsules' }],
  tags: ['Immunity'],
  meta_title: 'Zinc Tablets | ArvinPlus',
  meta_description: null,
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetches products from the storefront api', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      ok: true,
      json: async () => ({ success: true, products: [sampleSummary], count: 1 }),
    } as unknown as Response);

    const result = await service.getProducts();

    expect(result).toEqual([sampleSummary]);
    expect(window.fetch).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/storefront/products`,
      jasmine.anything()
    );
  });

  it('returns an empty array when the api is unavailable', async () => {
    spyOn(window, 'fetch').and.rejectWith(new Error('network down'));

    expect(await service.getProducts()).toEqual([]);
  });

  it('returns an empty array for a failed response', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      ok: false,
      json: async () => ({ success: false }),
    } as unknown as Response);

    expect(await service.getProducts()).toEqual([]);
  });

  it('fetches a single product by slug', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      ok: true,
      json: async () => ({ success: true, product: sampleDetail }),
    } as unknown as Response);

    const result = await service.getProductBySlug('zinc-tablets');

    expect(result).toEqual(sampleDetail);
    expect(window.fetch).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/storefront/products/zinc-tablets`,
      jasmine.anything()
    );
  });

  it('returns null when a product does not exist', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      ok: false,
      json: async () => ({ success: false }),
    } as unknown as Response);

    expect(await service.getProductBySlug('missing-product')).toBeNull();
  });
});
