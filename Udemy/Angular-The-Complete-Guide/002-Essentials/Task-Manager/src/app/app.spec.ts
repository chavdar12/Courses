import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('shows the tasks of the selected user', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Select a user');

    (el.querySelectorAll('app-user button')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('h2')?.textContent).toContain('Boris Ivanov');
  });
});
