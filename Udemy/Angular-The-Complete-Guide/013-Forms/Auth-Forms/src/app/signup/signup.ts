import { Component, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { equalValues, minChecked, mustContainDigit } from './validators';

export const SOURCES = ['Search engine', 'A friend', 'Social media'];

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" type="email" placeholder="Email" />
      <fieldset formGroupName="passwords">
        <input formControlName="password" type="password" placeholder="Password" />
        <input formControlName="confirm" type="password" placeholder="Repeat password" />
      </fieldset>
      <select formControlName="role">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <fieldset formArrayName="sources">
        <legend>How did you find us?</legend>
        @for (source of sources; track source; let i = $index) {
          <label><input type="checkbox" [formControlName]="i" /> {{ source }}</label>
        }
      </fieldset>
      <label><input type="checkbox" formControlName="terms" /> I agree to the terms</label>
      @if (submitted() && form.invalid) {
        <ul class="errors">
          @for (error of errors(); track error) {
            <li>{{ error }}</li>
          }
        </ul>
      }
      <button type="reset" (click)="reset()">Reset</button>
      <button type="submit">Sign up</button>
    </form>
  `,
})
export class Signup {
  readonly sources = SOURCES;
  readonly submitted = signal(false);
  readonly result = signal<unknown>(null);

  readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(8), mustContainDigit],
        }),
        confirm: new FormControl('', { nonNullable: true }),
      },
      { validators: equalValues('password', 'confirm') },
    ),
    role: new FormControl<'student' | 'teacher'>('student', { nonNullable: true }),
    sources: new FormArray(
      SOURCES.map(() => new FormControl(false, { nonNullable: true })),
      minChecked(1),
    ),
    terms: new FormControl(false, { nonNullable: true, validators: Validators.requiredTrue }),
  });

  errors(): string[] {
    const f = this.form.controls;
    const pw = f.passwords.controls.password;
    return [
      f.email.invalid && 'Enter a valid email.',
      pw.invalid && 'The password needs 8+ characters and a digit.',
      f.passwords.hasError('valuesNotEqual') && 'The passwords do not match.',
      f.sources.invalid && 'Pick at least one source.',
      f.terms.invalid && 'Accept the terms.',
    ].filter((e): e is string => !!e);
  }

  submit() {
    this.submitted.set(true);
    if (this.form.invalid) return;
    const { email, role, sources } = this.form.getRawValue();
    this.result.set({ email, role, sources: SOURCES.filter((_, i) => sources[i]) });
    this.reset();
  }

  reset() {
    this.form.reset();
    this.submitted.set(false);
  }
}
