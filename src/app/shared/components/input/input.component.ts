import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseControlDirective } from '@shared/directives/base-control.directive';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  hostDirectives: [BaseControlDirective],
})
export class InputComponent {
  /**
   * type
   *
   * @type {('text' | 'date')}
   */
  @Input() type: 'text' | 'date' = 'text';
  /**
   * Label
   *
   * @type {!string}
   */
  @Input() label!: string;
  /**
   * Min length to release value
   *
   * @type {number}
   */
  @Input() minLength = 1;
  /**
   * Delay
   *
   * @type {number}
   */
  @Input() delay = 300;
  /**
   * Input change to search
   *
   * @type {EventEmitter<string>}
   */
  @Output() inputChangeToSearch = new EventEmitter<string>();
  /**
   * Input change
   *
   * @type {EventEmitter<string>}
   */
  @Output() inputChange = new EventEmitter<string>();
  /**
   * Accessor Directive
   *
   * @type {*}
   */
  controlDirective = inject(BaseControlDirective);
  /**
   * Value Subject
   *
   * @private
   * @type {BehaviorSubject<string>}
   */
  private value$ = new BehaviorSubject<string>('');

  /**
   * Creates an instance of InputTextComponent
   *
   * @constructor
   */
  constructor() {
    this.value$
      .pipe(
        startWith(''),
        debounceTime(this.delay),
        filter((v: string) => v?.length >= this.minLength),
        distinctUntilChanged(),
        takeUntil(this.controlDirective.destroy$)
      )
      .subscribe((v) => this.inputChangeToSearch.next(v));
  }
  /**
   * On input change
   *
   * @param {string} value Value
   */
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputChange.next(inputValue);
    this.value$.next(inputValue);
    this.controlDirective.onChange(inputValue);
  }
}
