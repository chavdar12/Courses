import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// group validator: both controls must hold the same value
export function equalValues(a: string, b: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null =>
    group.get(a)?.value === group.get(b)?.value ? null : { valuesNotEqual: true };
}

export function mustContainDigit(control: AbstractControl): ValidationErrors | null {
  return /\d/.test(control.value ?? '') ? null : { noDigit: true };
}

// at least `min` checkboxes in a FormArray must be ticked
export function minChecked(min: number): ValidatorFn {
  return (array: AbstractControl): ValidationErrors | null =>
    (array.value as boolean[]).filter(Boolean).length >= min ? null : { minChecked: min };
}
