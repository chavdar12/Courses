import { Component, signal } from '@angular/core';
import { Login } from './login/login';
import { Signup } from './signup/signup';

@Component({
  selector: 'app-root',
  imports: [Login, Signup],
  template: `
    <h1>{{ mode() === 'login' ? 'Log in' : 'Sign up' }}</h1>
    <button (click)="mode.set(mode() === 'login' ? 'signup' : 'login')">
      {{ mode() === 'login' ? 'Need an account?' : 'Have an account?' }}
    </button>
    @if (mode() === 'login') {
      <app-login />
    } @else {
      <app-signup />
    }
  `,
})
export class App {
  readonly mode = signal<'login' | 'signup'>('login');
}
