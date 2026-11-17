import { TestBed } from '@angular/core/testing';
import { Header } from './header';

it('Header shows the app title', () => {
  const fixture = TestBed.createComponent(Header);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Task Manager');
});
