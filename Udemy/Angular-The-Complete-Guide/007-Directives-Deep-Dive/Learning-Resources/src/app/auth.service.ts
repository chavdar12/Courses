import { Injectable, signal } from '@angular/core';

export type Role = 'guest' | 'user' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly role = signal<Role>('guest');
}
