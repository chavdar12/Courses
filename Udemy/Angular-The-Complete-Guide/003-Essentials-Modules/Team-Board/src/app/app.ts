import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <h1>Team Board</h1>
    <app-member-list />
  `,
})
export class App {}
