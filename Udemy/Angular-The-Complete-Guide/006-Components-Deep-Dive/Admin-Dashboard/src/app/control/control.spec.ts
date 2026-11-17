import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Control } from './control';

@Component({
  imports: [Control],
  template: `<p appControl label="Title"><input #field /></p>`,
})
class Host {}

it('Control adds its host class and focuses the projected field on click', () => {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const p: HTMLElement = fixture.nativeElement.querySelector('p');
  document.body.appendChild(fixture.nativeElement);
  expect(p.classList).toContain('control');
  expect(p.querySelector('label')?.textContent).toBe('Title');
  p.click();
  expect(document.activeElement).toBe(p.querySelector('input'));
});
