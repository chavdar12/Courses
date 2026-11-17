import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav><a routerLink="/">Notes</a> · <a routerLink="/about">About</a></nav>
    <router-outlet />
  `,
})
export class App {}
