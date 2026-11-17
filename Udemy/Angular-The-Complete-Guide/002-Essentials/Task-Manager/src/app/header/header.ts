import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>Task Manager</h1>
      <p>Pick a teammate to see and plan their work</p>
    </header>
  `,
  styles: `
    header {
      text-align: center;
      padding: 1rem;
    }
  `,
})
export class Header {}
