import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [ReactiveFormsModule],
})
export class InputTextComponent implements OnDestroy {
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
   * Destroy subject
   *
   * @type {Subject}
   */
  private destroy$ = new Subject();
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
        takeUntil(this.destroy$)
      )
      .subscribe((v) => this.inputChangeToSearch.next(v));
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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
  }
}
