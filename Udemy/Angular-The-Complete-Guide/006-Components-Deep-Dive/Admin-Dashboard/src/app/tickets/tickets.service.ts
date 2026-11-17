import { Injectable, signal } from '@angular/core';

export interface Ticket {
  id: number;
  title: string;
  request: string;
  status: 'open' | 'closed';
}

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private nextId = 1;
  readonly tickets = signal<Ticket[]>([]);

  add(title: string, request: string) {
    this.tickets.update((t) => [...t, { id: this.nextId++, title, request, status: 'open' }]);
  }

  close(id: number) {
    this.tickets.update((t) => t.map((x) => (x.id === id ? { ...x, status: 'closed' } : x)));
  }
}
