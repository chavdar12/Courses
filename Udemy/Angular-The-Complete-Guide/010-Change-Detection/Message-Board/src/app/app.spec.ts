import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('a message sent in one OnPush child shows up in the other', async () => {
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  const el: HTMLElement = fixture.nativeElement;
  el.querySelector('input')!.value = 'from the form';
  el.querySelector('app-new-message button')!.dispatchEvent(new Event('click'));
  await fixture.whenStable();
  expect(el.querySelector('app-messages-list li')?.textContent).toBe('from the form');
});
