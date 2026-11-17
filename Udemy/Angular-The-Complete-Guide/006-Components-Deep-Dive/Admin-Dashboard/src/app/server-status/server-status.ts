import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

export type Status = 'online' | 'offline' | 'unknown';

@Component({
  selector: 'app-server-status',
  template: `<p [class]="status()">Servers are {{ status() }}</p>`,
  styles: `
    .online {
      color: green;
    }
    .offline {
      color: red;
    }
  `,
})
export class ServerStatus implements OnInit {
  readonly status = signal<Status>('online');
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    const id = setInterval(() => {
      const r = Math.random();
      this.status.set(r < 0.5 ? 'online' : r < 0.9 ? 'offline' : 'unknown');
    }, 5000);
    // lifecycle: stop polling when the component is destroyed
    this.destroyRef.onDestroy(() => clearInterval(id));
  }
}
