import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validates input to be valid page number, page range, or arbitrary
 * combination of multiple of numbers or ranges.
 * @param control Control to validate
 */
export function pageValidator(control: AbstractControl): ValidationErrors {
  if (!control || !control.value || typeof (control.value) !== 'string') {
    return;
  }
  const { value } = control;
  if (!/^((\d+)(-\d+)?(, *)?)+$/.test(value)) {
    return { page: true };
  }

  const pages = (value).split(/(, *)/)
    .filter(val => !/(, *)/.test(val))
    .map(entry => entry.split('-'));

  for (const entry of pages) {
    if (entry.length > 1) {
      const from = parseInt(entry[0], 10);
      const to = parseInt(entry[1], 10);
      if (to < from) {
        return { page: true };
      }
    }
  }
}
