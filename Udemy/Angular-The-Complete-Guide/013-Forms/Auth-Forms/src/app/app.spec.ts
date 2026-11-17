import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('App switches between the login and signup forms', () => {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelector('app-login')).not.toBeNull();
  el.querySelector('button')!.click();
  fixture.detectChanges();
  expect(el.querySelector('app-signup')).not.toBeNull();
  expect(el.querySelector('h1')?.textContent).toBe('Sign up');
});
