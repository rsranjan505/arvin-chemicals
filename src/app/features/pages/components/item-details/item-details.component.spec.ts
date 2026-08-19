import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ItemDetailsComponent } from './item-details.component';
import { ProductService } from '../../../../services/product/product.service';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: { subscribe: () => {} } },
        },
        {
          provide: ProductService,
          useValue: { getProductBySlug: () => Promise.resolve(null) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
