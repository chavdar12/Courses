import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { AuthService } from './core/auth.service';

const API = 'https://jsonplaceholder.typicode.com/users';
const user = {
  id: 1,
  name: 'Leanne Graham',
  email: 'l@g.com',
  phone: '1-770',
  website: 'hildegard.org',
};

describe('app routes', () => {
  let harness: RouterTestingHarness;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    harness = await RouterTestingHarness.create();
    http = TestBed.inject(HttpTestingController);
  });

  const url = () => TestBed.inject(Router).url;
  const text = () => harness.routeNativeElement!.textContent;

  it('redirects the empty path to home', async () => {
    await harness.navigateByUrl('/');
    expect(url()).toBe('/home');
  });

  it('shows 404 for unknown urls', async () => {
    await harness.navigateByUrl('/nope');
    expect(text()).toContain('404');
  });

  it('resolves the user before showing the detail', async () => {
    const nav = harness.navigateByUrl('/users/1');
    // The resolver runs before UserList renders and requests the list.
    (await vi.waitFor(() => http.expectOne(`${API}/1`))).flush(user);
    await nav;
    http.expectOne(API).flush([user]);
    harness.detectChanges();
    expect(text()).toContain('l@g.com');
  });

  it('guards the profile and sends guests home with a returnUrl', async () => {
    await harness.navigateByUrl('/users/1/profile');
    expect(url()).toBe('/home?returnUrl=%2Fusers%2F1%2Fprofile');
    expect(text()).toContain('/users/1/profile');
  });

  it('lets logged in users open the lazy admin page', async () => {
    TestBed.inject(AuthService).toggle();
    await harness.navigateByUrl('/admin');
    expect(text()).toContain('lazy loaded');
  });

  it('does not match admin for guests', async () => {
    await harness.navigateByUrl('/admin');
    expect(url()).toBe('/home?returnUrl=%2Fadmin');
  });
});
