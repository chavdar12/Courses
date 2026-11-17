import { TestBed } from '@angular/core/testing';
import { Tickets } from './tickets';

it('Tickets adds a ticket from the form and closes it', () => {
  const fixture = TestBed.createComponent(Tickets);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  expect(el.textContent).toContain('No tickets');

  const form = fixture.debugElement.query((d) => d.name === 'app-new-ticket').componentInstance;
  form.title = 'VPN';
  form.request = 'Cannot connect';
  form.submit();
  fixture.detectChanges();
  expect(el.querySelector('li')?.textContent).toContain('VPN (open)');

  (el.querySelector('li button') as HTMLButtonElement).click();
  fixture.detectChanges();
  expect(el.querySelector('li')?.className).toBe('closed');
});
