import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="value">{{ count() }}</p>
    <button (click)="count.set(count() - 1)">-</button>
    <button (click)="count.set(count() + 1)">+</button>
    <button (click)="later()">+1 in a second</button>
  `,
})
export class Counter {
  readonly count = signal(0);

  // a timer outside any template event: the signal alone schedules change detection (zoneless)
  later() {
    setTimeout(() => this.count.update((n) => n + 1), 1000);
  }
}
