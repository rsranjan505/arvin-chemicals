import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCollectionComponent } from './our-collection.component';

describe('OurCollectionComponent', () => {
  let component: OurCollectionComponent;
  let fixture: ComponentFixture<OurCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
