import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SortPipe } from './sort.pipe';
import { TemperaturePipe, Unit } from './temperature.pipe';

@Component({
  selector: 'app-root',
  imports: [DatePipe, TemperaturePipe, SortPipe],
  template: `
    <h1>Weather Log</h1>
    <p class="today">{{ today | date: 'dd.MM.yyyy' }}</p>
    <button (click)="unit.set(unit() === 'C' ? 'F' : 'C')">
      Show in °{{ unit() === 'C' ? 'F' : 'C' }}
    </button>
    <button (click)="reset()">Reset readings</button>
    <ol>
      @for (t of readings() | sort: 'desc'; track $index) {
        <li>{{ t | temperature: 'C' : unit() }}</li>
      }
    </ol>
  `,
})
export class App {
  readonly today = new Date(2026, 10, 17);
  readonly unit = signal<Unit>('C');
  readonly readings = signal([4.2, 18.5, -3, 11]);

  reset() {
    // a new array, so the pure sort pipe sees the change
    this.readings.set([0, 0, 0, 0]);
  }
}
