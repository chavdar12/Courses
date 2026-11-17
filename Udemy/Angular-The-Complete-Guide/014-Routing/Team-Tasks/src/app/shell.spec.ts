import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

it('App links every user', () => {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  const links = [...fixture.nativeElement.querySelectorAll('nav a')] as HTMLAnchorElement[];
  expect(links.map((a) => a.getAttribute('href'))).toEqual(['/users/u1', '/users/u2']);
});
