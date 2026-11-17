import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { UserService } from './core/services/user.service';

describe('forum guards', () => {
  let harness: RouterTestingHarness;
  const url = () => TestBed.inject(Router).url;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    });
    harness = await RouterTestingHarness.create();
  });

  it('sends guests from protected pages to login', async () => {
    await harness.navigateByUrl('/add-theme');
    expect(url()).toBe('/login');
    await harness.navigateByUrl('/profile');
    expect(url()).toBe('/login');
  });

  it('sends logged in users away from login/register', async () => {
    TestBed.inject(UserService).login('johny@gmail.com', '12345');
    await harness.navigateByUrl('/login');
    expect(url()).toBe('/home');
    await harness.navigateByUrl('/register');
    expect(url()).toBe('/home');
  });

  it('/logout logs out and goes home', async () => {
    const users = TestBed.inject(UserService);
    users.login('johny@gmail.com', '12345');
    await harness.navigateByUrl('/logout');
    expect(users.isLoggedIn()).toBe(false);
    expect(url()).toBe('/home');
  });

  it('shows not found for unknown pages', async () => {
    await harness.navigateByUrl('/nope');
    expect(harness.routeNativeElement!.textContent).toMatch(/not found/i);
  });
});
