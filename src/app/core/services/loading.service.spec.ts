import { TestBed } from '@angular/core/testing';

import { first } from 'rxjs';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading value', () => {
    const value = true;
    service.loading = value;
    service.loading$.pipe(first()).subscribe((v) => expect(v).toBeTrue());
  });
});
