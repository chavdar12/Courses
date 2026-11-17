import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>Team Tasks</h1>
    <nav>
      @for (user of data.users; track user.id) {
        <a [routerLink]="['/users', user.id]" routerLinkActive="active">{{ user.name }}</a>
      }
    </nav>
    <router-outlet />
  `,
})
export class App {
  protected readonly data = inject(DataService);
}
