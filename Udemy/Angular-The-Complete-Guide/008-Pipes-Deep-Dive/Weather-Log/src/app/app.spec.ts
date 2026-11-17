import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('lists readings sorted descending and switches units', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const items = () => [...el.querySelectorAll('li')].map((li) => li.textContent?.trim());

    expect(el.querySelector('.today')?.textContent).toBe('17.11.2026');
    expect(items()).toEqual(['18.5°C', '11.0°C', '4.2°C', '-3.0°C']);

    el.querySelector('button')!.click();
    fixture.detectChanges();
    expect(items()[0]).toBe('65.3°F');

    fixture.componentInstance.reset();
    fixture.detectChanges();
    expect(items()).toEqual(['32.0°F', '32.0°F', '32.0°F', '32.0°F']);
  });
});
