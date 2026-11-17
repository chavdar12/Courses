import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('App wires the form to the results table', () => {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  (el.querySelector('button[type=submit]') as HTMLButtonElement).click();
  fixture.detectChanges();
  expect(el.querySelectorAll('tbody tr')).toHaveLength(10);
});
