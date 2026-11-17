import { Injectable, signal } from '@angular/core';

// one place for request errors, shown by the app shell
@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly message = signal('');

  show(message: string) {
    this.message.set(message);
  }

  clear() {
    this.message.set('');
  }
}
