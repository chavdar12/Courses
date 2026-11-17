import { TestBed } from '@angular/core/testing';
import { TicketsService } from './tickets.service';

it('TicketsService adds open tickets and closes them by id', () => {
  const service = TestBed.inject(TicketsService);
  service.add('A', 'a');
  service.add('B', 'b');
  service.close(1);
  expect(service.tickets().map((t) => [t.id, t.status])).toEqual([
    [1, 'closed'],
    [2, 'open'],
  ]);
});
