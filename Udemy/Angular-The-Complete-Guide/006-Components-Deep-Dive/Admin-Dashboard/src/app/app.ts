import { Component, signal } from '@angular/core';
import { Rect } from './rect/rect';
import { ServerStatus } from './server-status/server-status';
import { Tickets } from './tickets/tickets';
import { Widget } from './widget/widget';

@Component({
  selector: 'app-root',
  imports: [Widget, ServerStatus, Tickets, Rect],
  template: `
    <h1>Admin Dashboard</h1>
    <main>
      <app-widget title="Server status"><app-server-status /></app-widget>
      <app-widget title="Support tickets"><app-tickets /></app-widget>
      <app-widget title="Panel size">
        <app-rect widget-actions [(size)]="panel" />
        <p>{{ panel().width }} × {{ panel().height }}</p>
      </app-widget>
    </main>
  `,
})
export class App {
  readonly panel = signal({ width: 100, height: 50 });
}
