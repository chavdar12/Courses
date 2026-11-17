import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export const SAVED_EMAIL_KEY = 'saved-login-email';

// template-driven form: validation lives in the template attributes
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="submit(form)">
      <label>
        Email
        <input name="email" type="email" [ngModel]="savedEmail" required email #email="ngModel" />
      </label>
      @if (email.touched && email.invalid) {
        <p class="error">Enter a valid email.</p>
      }
      <label>
        Password
        <input name="password" type="password" ngModel required minlength="8" #pw="ngModel" />
      </label>
      @if (pw.touched && pw.invalid) {
        <p class="error">The password needs at least 8 characters.</p>
      }
      <button type="submit">Log in</button>
    </form>
    @if (loggedIn()) {
      <p class="success">Logged in as {{ loggedIn() }}</p>
    }
  `,
})
export class Login {
  readonly savedEmail = localStorage.getItem(SAVED_EMAIL_KEY) ?? '';
  readonly loggedIn = signal('');

  submit(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    const email: string = form.value.email;
    localStorage.setItem(SAVED_EMAIL_KEY, email);
    this.loggedIn.set(email);
    form.resetForm({ email });
  }
}
