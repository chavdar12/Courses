import { Component, input, output } from '@angular/core';
import { User as UserModel } from '../users';

@Component({
  selector: 'app-user',
  template: `
    <button [class.active]="selected()" (click)="select.emit(user().id)">
      <span class="avatar">{{ user().initials }}</span>
      {{ user().name }}
    </button>
  `,
  styles: `
    button {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      width: 100%;
    }
    .active {
      background: #4b2a85;
      color: white;
    }
  `,
})
export class User {
  readonly user = input.required<UserModel>();
  readonly selected = input(false);
  readonly select = output<string>();
}
