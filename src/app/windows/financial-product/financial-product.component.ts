import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DateValidator } from '@shared/validators/date.validator';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-financial-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './financial-product.component.html',
  styleUrls: ['./financial-product.component.scss'],
})
export class FinancialProductComponent implements OnInit, OnDestroy {
  form: FormGroup;
  title = 'Formulario de Registro';
  type!: 'edit' | 'add';

  /**
   * Destroy subject
   *
   * @type {Subject}
   */
  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute) {
    this.form = new FormGroup({
      id: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
      ]),
      description: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl<string>('', [Validators.required]),
      date_release: new FormControl<Date | null>(null, [
        Validators.required,
        DateValidator.rangeDate(new Date()),
      ]),
      date_revision: new FormControl<Date | null>(null, [Validators.required]),
    });

    this.form
      .get('id')
      ?.statusChanges.subscribe((t) => console.log('status ', t));
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = +params['id'];
      this.type = id ? 'edit' : 'add';
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getMinMaxErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    const minValue = control?.getError('minlength')?.requiredLength;
    const maxValue = control?.getError('maxlength')?.requiredLength;
    return `Ingrese un valor entre ${minValue} y ${maxValue} carácteres`;
  }

  resetForm(): void {
    this.form.reset();
  }

  sendForm(): void {
    if (this.form.valid) {
      // TODO: send data
    }
  }
}
