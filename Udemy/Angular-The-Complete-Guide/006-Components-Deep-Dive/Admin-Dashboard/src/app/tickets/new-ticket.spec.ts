import { TestBed } from '@angular/core/testing';
import { NewTicket } from './new-ticket';

it('NewTicket validates, emits trimmed values and resets', () => {
  const fixture = TestBed.createComponent(NewTicket);
  const cmp = fixture.componentInstance;
  const added: unknown[] = [];
  cmp.add.subscribe((t) => added.push(t));
  fixture.detectChanges();

  cmp.submit();
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('[role=alert]')).not.toBeNull();

  cmp.title = ' Printer ';
  cmp.request = ' Out of paper ';
  cmp.submit();
  expect(added).toEqual([{ title: 'Printer', request: 'Out of paper' }]);
  expect(cmp.title).toBe('');
});
