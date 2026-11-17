import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  template: `<div class="card"><ng-content /></div>`,
  styles: `
    .card {
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
    }
  `,
})
export class Card {}
