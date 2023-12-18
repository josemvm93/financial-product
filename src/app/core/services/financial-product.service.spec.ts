import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FinancialProductService } from './financial-product.service';

describe('FinancialProductService', () => {
  let service: FinancialProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService],
    });
    service = TestBed.inject(FinancialProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
