import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() name!: string;
  @Input() disabled!: boolean;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() ariaLabel!: string;
  @Input() ariaLabelledBy!: string;
  @Output()
  readonly clicked: EventEmitter<boolean> = new EventEmitter();
  /**
   * Get variant class
   *
   * @returns {string} Variant Class
   */
  getVariantClass(): string {
    return 'button--' + this.variant;
  }
  /**
   * Handle Click
   */
  handleClick(): void {
    this.clicked.emit(true);
  }
}
