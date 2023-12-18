import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import {
  FormControl,
  FormControlDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseControlDirective } from './base-control.directive';

describe('BaseControlDirective', () => {
  let directive: BaseControlDirective;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [BaseControlDirective, FormControlDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    directive = TestBed.inject(BaseControlDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
  it('should isRequired be true', () => {
    directive.control = new FormControl(null, [Validators.required]);
    expect(directive.isRequired).toBe(true);
  });
  it('should isRequired be false', () => {
    directive.control = new FormControl(null, []);
    expect(directive.isRequired).toBe(false);
  });
  it('should call writeValue', () => {
    spyOn(directive, 'writeValue').and.callThrough();
    const value = 'test';
    directive.writeValue(value);
    expect(directive.writeValue).toHaveBeenCalledWith(value);
  });

  it('should call registerOnChange method', () => {
    spyOn(directive, 'registerOnChange').and.callThrough();
    const fn = () => {};
    directive.registerOnChange(fn);
    expect(directive.registerOnChange).toHaveBeenCalled();
  });

  it('should call registerOnTouched method', fakeAsync(() => {
    spyOn(directive, 'registerOnTouched').and.callThrough();
    const fn = () => {};
    directive.registerOnTouched(fn);
    tick();
    expect(directive.registerOnTouched).toHaveBeenCalled();
  }));

  it('should call setDisabledState with true', () => {
    spyOn(directive, 'setDisabledState').and.callThrough();
    directive.setDisabledState(true);
    expect(directive.setDisabledState).toHaveBeenCalledWith(true);
  });
  it('should call setDisabledState with true', () => {
    spyOn(directive, 'setDisabledState').and.callThrough();
    directive.setDisabledState(false);
    expect(directive.setDisabledState).toHaveBeenCalledWith(false);
  });
});
