import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Widget } from './widget';

@Component({
  imports: [Widget],
  template: `<app-widget title="Traffic"
    ><button widget-actions>Refresh</button>
    <p>body</p></app-widget
  >`,
})
class Host {}

it('Widget projects actions into the header and the rest into the body', () => {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelector('header h2')?.textContent).toBe('Traffic');
  expect(el.querySelector('header button')?.textContent).toBe('Refresh');
  expect(el.querySelector('section > p')?.textContent).toBe('body');
});
