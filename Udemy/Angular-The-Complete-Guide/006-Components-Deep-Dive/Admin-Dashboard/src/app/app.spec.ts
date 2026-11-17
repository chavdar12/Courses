import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('App lays out the widgets and keeps the panel size in sync', () => {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelectorAll('app-widget')).toHaveLength(3);
  (el.querySelector('app-rect button') as HTMLButtonElement).click();
  fixture.detectChanges();
  expect(el.textContent).toContain('200 × 100');
  fixture.destroy();
});
