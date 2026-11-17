import { Component, computed, signal } from '@angular/core';
import { Header } from './header/header';
import { Tasks } from './tasks/tasks';
import { User } from './user/user';
import { USERS } from './users';

@Component({
  selector: 'app-root',
  imports: [Header, User, Tasks],
  template: `
    <app-header />
    <main>
      <ul>
        @for (user of users; track user.id) {
          <li>
            <app-user
              [user]="user"
              [selected]="user.id === selectedId()"
              (select)="selectedId.set($event)"
            />
          </li>
        }
      </ul>
      @if (selectedUser(); as user) {
        <app-tasks [userId]="user.id" [name]="user.name" />
      } @else {
        <p>Select a user to see their tasks.</p>
      }
    </main>
  `,
})
export class App {
  readonly users = USERS;
  readonly selectedId = signal<string | null>(null);
  readonly selectedUser = computed(() => this.users.find((u) => u.id === this.selectedId()));
}
