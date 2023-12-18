import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { BaseControlDirective } from './base-control.directive';

describe('BaseControlDirective', () => {
  let directive: BaseControlDirective;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        BaseControlDirective,
        // FormGroupDirective,
        FormControlDirective,
        // FormControlName,
        // NgModel,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    directive = TestBed.inject(BaseControlDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
