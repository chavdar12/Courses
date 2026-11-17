import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SafeLink } from './safe-link';

@Component({
  imports: [SafeLink],
  template: `<a href="https://angular.dev/guide" appSafeLink="course">Docs</a>`,
})
class Host {}

describe('SafeLink', () => {
  const click = (a: HTMLAnchorElement) => {
    const event = new MouseEvent('click', { cancelable: true });
    a.dispatchEvent(event);
    return event;
  };

  it('cancels navigation when the user declines', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(click(a).defaultPrevented).toBe(true);
    expect(a.href).toBe('https://angular.dev/guide');
  });

  it('adds the from query parameter when the user agrees', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    a.addEventListener('click', (e) => e.preventDefault()); // keep jsdom from navigating
    click(a);
    expect(a.href).toBe('https://angular.dev/guide?from=course');
  });
});
