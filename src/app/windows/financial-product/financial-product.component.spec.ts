import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductComponent } from './financial-product.component';

describe('FinancialProductComponent', () => {
  let component: FinancialProductComponent;
  let fixture: ComponentFixture<FinancialProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FinancialProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
