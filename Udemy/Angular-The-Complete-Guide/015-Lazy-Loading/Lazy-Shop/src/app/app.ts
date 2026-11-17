import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1><a routerLink="/">Lazy Shop</a></h1>
    <router-outlet />
  `,
})
export class App {}
