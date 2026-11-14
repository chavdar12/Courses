import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { NotificationService } from './core/notification/notification.service';
import { UserService } from './core/services/user.service';

describe('forum guards', () => {
  let harness: RouterTestingHarness;
  const url = () => TestBed.inject(Router).url;
  const logIn = () => TestBed.inject(UserService).currentUser.set({ _id: '1' } as never);

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
    logIn();
    await harness.navigateByUrl('/register');
    expect(url()).toBe('/home');
  });

  it('/logout calls the API, notifies and goes home', async () => {
    logIn();
    const nav = harness.navigateByUrl('/logout');
    (await vi.waitFor(() => TestBed.inject(HttpTestingController).expectOne('/api/logout'))).flush(
      null,
    );
    await nav;

    expect(TestBed.inject(UserService).isLoggedIn()).toBe(false);
    expect(TestBed.inject(NotificationService).current()?.type).toBe('success');
    expect(url()).toBe('/home');
  });
});
