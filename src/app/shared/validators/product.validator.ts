import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { FinancialProductService } from '@core/services/financial-product.service';
import { Observable, catchError, map, of } from 'rxjs';

export class ProductValidator {
  static validateId(productService: FinancialProductService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (control.invalid) {
        return of(null);
      }
      return productService.verifyProductId(value).pipe(
        map((existed: boolean) => (existed ? { validateId: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
