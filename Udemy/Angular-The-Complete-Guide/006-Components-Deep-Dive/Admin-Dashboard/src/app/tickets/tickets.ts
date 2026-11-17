import { Component, inject } from '@angular/core';
import { NewTicket } from './new-ticket';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  imports: [NewTicket],
  template: `
    <ul>
      @for (ticket of service.tickets(); track ticket.id) {
        <li [class.closed]="ticket.status === 'closed'">
          {{ ticket.title }} ({{ ticket.status }})
          @if (ticket.status === 'open') {
            <button (click)="service.close(ticket.id)">Mark as done</button>
          }
        </li>
      } @empty {
        <li>No tickets</li>
      }
    </ul>
    <app-new-ticket (add)="service.add($event.title, $event.request)" />
  `,
})
export class Tickets {
  protected readonly service = inject(TicketsService);
}
