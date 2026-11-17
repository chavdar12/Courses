import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { Auth } from './auth';

@Component({ imports: [Auth], template: `<p *appAuth="'admin'">secret</p>` })
class Host {}

it('Auth shows its template only for the matching role', async () => {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  expect(fixture.nativeElement.textContent).not.toContain('secret');

  TestBed.inject(AuthService).role.set('admin');
  await fixture.whenStable();
  expect(fixture.nativeElement.textContent).toContain('secret');

  TestBed.inject(AuthService).role.set('user');
  await fixture.whenStable();
  expect(fixture.nativeElement.textContent).not.toContain('secret');
});
