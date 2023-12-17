import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseControlDirective } from '@shared/directives/base-control.directive';

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
   * On blur
   *
   * @type {EventEmitter<string>}
   */
  @Output() onBlur = new EventEmitter<boolean>();
  /**
   * Accessor Directive
   *
   * @type {*}
   */
  controlDirective = inject(BaseControlDirective);

  /**
   * Creates an instance of InputTextComponent
   *
   * @constructor
   */
  constructor() {}
  /**
   * On input blur
   */
  onInputBlur(): void {
    this.onBlur.next(true);
  }
}
