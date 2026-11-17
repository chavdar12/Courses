import { Injectable, signal } from '@angular/core';

// provided on the lazy admin route only, so it ships in the admin chunk
@Injectable()
export class StatsService {
  readonly visits = signal(0);

  visit() {
    this.visits.update((n) => n + 1);
  }
}
