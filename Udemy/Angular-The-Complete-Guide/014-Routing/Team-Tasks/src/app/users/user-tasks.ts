import { Component, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>{{ userName() }}'s tasks</h2>
    <nav>
      <a routerLink="tasks" [queryParams]="{ order: 'asc' }">Oldest first</a>
      <a routerLink="tasks" [queryParams]="{ order: 'desc' }">Newest first</a>
      <a routerLink="tasks/new">New task</a>
    </nav>
    <router-outlet />
  `,
})
export class UserTasks {
  readonly userName = input.required<string>(); // from the route resolver
}
