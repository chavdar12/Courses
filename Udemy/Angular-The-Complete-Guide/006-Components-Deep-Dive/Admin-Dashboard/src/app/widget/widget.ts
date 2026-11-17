import { Component, input } from '@angular/core';

// content projection: the header slot takes [widget-actions], everything else goes to the body
@Component({
  selector: 'app-widget',
  template: `
    <section class="widget">
      <header>
        <h2>{{ title() }}</h2>
        <ng-content select="[widget-actions]" />
      </header>
      <ng-content />
    </section>
  `,
  styles: `
    .widget {
      padding: 1rem;
      border-radius: 8px;
      background: #f3f0fa;
    }
    header {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class Widget {
  readonly title = input.required<string>();
}
