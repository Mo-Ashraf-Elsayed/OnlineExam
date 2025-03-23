import { AbstractControl } from '@angular/forms';

export const matchPassword = (control: AbstractControl): object | null => {
  return control.get('password')?.value === control.get('rePassword')?.value
    ? null
    : { mismatch: true };
};
