import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialProduct } from '@core/models/financial-product.model';
import { FinancialProductService } from '@core/services/financial-product.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { CommonUtils } from '@shared/utils/common-utils';
import { DateValidator } from '@shared/validators/date.validator';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { LoadingService } from './../../core/services/loading.service';

@Component({
  selector: 'app-financial-product',
  standalone: true,
  templateUrl: './financial-product.component.html',
  styleUrls: ['./financial-product.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  providers: [DatePipe],
})
export class FinancialProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  title = 'Formulario de Registro';
  type!: 'edit' | 'add';
  /**
   * Calendar Format
   *
   * @readonly
   * @type {"dd/MM/yyyy"}
   */
  readonly calendarFormat = 'dd/MM/yyyy';
  /**
   * Destroy subject
   *
   * @type {Subject}
   */
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private productService: FinancialProductService,
    private datePipe: DatePipe,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.createForm();
  }

  get idControl(): FormControl {
    return this.form.get('id') as FormControl;
  }

  get dateReleaseControl(): FormControl {
    return this.form.get('date_release') as FormControl;
  }
  get dateRevisonControl(): FormControl {
    return this.form.get('date_revision') as FormControl;
  }
  /**
   * Is form valid
   *
   * @readonly
   * @type {boolean}
   */
  get isFormValid(): boolean {
    return this.form.valid;
  }
  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        // ProductValidator.validateId(productService),
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
      date_revision: new FormControl<Date | null>(
        { value: null, disabled: true },
        [Validators.required]
      ),
    });
    this.verifyIDControl();
    this.verifyDateRelease();
  }

  verifyIDControl(): void {
    this.idControl?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((idValue) => {
          let result = of(false);
          if (this.idControl?.valid) {
            result = this.productService.verifyProductId(idValue);
          }
          return result;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((exists) => {
        if (exists) {
          this.idControl?.setErrors({ validateId: true });
        }
      });
  }

  verifyDateRelease(): void {
    this.dateReleaseControl?.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((dateRelease: Date) => {
        const date = new Date(dateRelease);
        if (!isNaN(date?.getTime())) {
          this.dateRevisonControl?.setValue(
            this.datePipe.transform(
              CommonUtils.addYearsToDate(date),
              'yyyy-MM-dd'
            )
          );
        }
      });
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
    if (this.isFormValid) {
      this.loadingService.loading = true;
      const product: FinancialProduct = this.form.value;
      product.date_revision = this.dateRevisonControl.value;
      this.productService
        .createProduct(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadingService.loading = false;
            this.redirectTo();
          },
          error: () => {
            this.loadingService.loading = false;
          },
        });
    }
  }

  /**
   * Redirect to
   */
  redirectTo(): void {
    this.router.navigate(['/financial-products/']);
    // this.router.navigate(['product'], { relativeTo: this.route });
  }

  onBlurId(): void {
    // this.productService
    //   .verifyProductId(idValue)
    //   .subscribe((t) => console.log('subss  ', t));
  }
}
