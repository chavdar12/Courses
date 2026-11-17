import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('App renders the resources page', () => {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('app-resources a').textContent).toBe('Angular docs');
});
