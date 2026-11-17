import { Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, scan } from 'rxjs';
import { ticker } from './ticker';

@Component({
  selector: 'app-root',
  template: `
    <h1>RxJS Playground</h1>
    <p class="seconds">Seconds open: {{ seconds() }}</p>
    <button (click)="clicks.update((n) => n + 1)">Click me</button>
    <p class="clicks">
      Clicks: {{ clicks() }}, running total of doubled clicks: {{ doubledTotal() }}
    </p>
    <p class="countdown">Countdown tick: {{ countdown() ?? 'not started' }}</p>
  `,
})
export class App {
  readonly clicks = signal(0);
  // observable -> signal; toSignal unsubscribes when the component is destroyed
  readonly seconds = toSignal(interval(1000).pipe(map((n) => n + 1)), { initialValue: 0 });
  // signal -> observable -> operators -> signal
  readonly doubledTotal = toSignal(
    toObservable(this.clicks).pipe(
      map((n) => n * 2),
      scan((total, n) => total + n, 0),
    ),
    { initialValue: 0 },
  );
  readonly countdown = toSignal(ticker(1000, 5).pipe(map((n) => 5 - n)));
}
