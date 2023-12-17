import { Directive, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseControlDirective,
    },
  ],
})
export class BaseControlDirective
  implements OnInit, OnDestroy, ControlValueAccessor
{
  /**
   * Control
   *
   * @type {FormControl}
   */
  control: FormControl = new FormControl();
  /**
   * Destroy subject
   *
   * @type {Subject}
   */
  destroy$ = new Subject();
  /**
   * Injector
   *
   * @private
   * @type {*}
   */
  private injector = inject(Injector);

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    const injectedControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });

    this.control = this.injector
      .get(FormGroupDirective)
      .getControl(injectedControl as FormControlName);
  }
  /**
   * Is Required
   *
   * @readonly
   * @type {boolean}
   */
  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  /**
   * Write value
   *
   * @param {*} value Value
   */
  writeValue(value: any) {
    this.control.setValue(value);
  }
  /**
   * Register on change
   *
   * @param {*} fn Fn
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  /**
   * Register on touched
   *
   * @param {*} fn Fn
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  /**
   * Set disabled state
   *
   * @param {boolean} isDisabled Is disabled
   */
  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.control.disable() : this.control.enable();
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
