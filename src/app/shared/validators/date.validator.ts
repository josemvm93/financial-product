import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonUtils } from '@shared/utils/common-utils';

export class DateValidator {
  static rangeDate(minDate: Date, maxDate?: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      try {
        let controlDate: Date = new Date(control.value);
        controlDate = CommonUtils.transformDateWithoutHour(controlDate, true);
        let minDateValue = CommonUtils.transformDateWithoutHour(minDate);
        let maxDateValue = maxDate
          ? CommonUtils.transformDateWithoutHour(maxDate)
          : null;
        if (!isNaN(controlDate?.getTime())) {
          if (minDateValue && controlDate < minDateValue) {
            return { minDate };
          } else if (maxDateValue && controlDate > maxDateValue) {
            return { maxDate };
          } else {
            return null;
          }
        } else {
          throw new Error();
        }
      } catch {
        return { invalidDate: true };
      }
    };
  }
}
