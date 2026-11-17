import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Resources } from './resources';

it('Resources shows role specific text and safe links', async () => {
  const fixture = TestBed.createComponent(Resources);
  await fixture.whenStable();
  const el: HTMLElement = fixture.nativeElement;
  expect(el.querySelectorAll('a')).toHaveLength(2);
  expect(el.querySelector('.admin')).toBeNull();

  TestBed.inject(AuthService).role.set('admin');
  await fixture.whenStable();
  expect(el.querySelector('.admin')).not.toBeNull();
  expect(el.querySelector('.user')).toBeNull();
});
