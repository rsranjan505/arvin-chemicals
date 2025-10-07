import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcellationPolicyComponent } from './concellation-policy.component';

describe('ConcellationPolicyComponent', () => {
  let component: ConcellationPolicyComponent;
  let fixture: ComponentFixture<ConcellationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcellationPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcellationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
