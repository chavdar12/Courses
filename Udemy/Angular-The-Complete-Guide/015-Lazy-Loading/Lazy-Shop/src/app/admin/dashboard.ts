import { Component, inject } from '@angular/core';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Admin dashboard</h2>
    <p class="visits">Visits: {{ stats.visits() }}</p>
  `,
})
export class Dashboard {
  protected readonly stats = inject(StatsService);

  constructor() {
    this.stats.visit();
  }
}
