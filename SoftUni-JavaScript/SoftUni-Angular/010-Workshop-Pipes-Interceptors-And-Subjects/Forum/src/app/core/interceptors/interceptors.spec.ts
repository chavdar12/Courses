import { HttpClient, HttpContext, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../services/user.service';
import { authInterceptor } from './auth.interceptor';
import { errorInterceptor, SKIP_ERROR_NOTIFICATION } from './error.interceptor';

describe('interceptors', () => {
  let http: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
  });

  afterEach(() => http.verify());

  const fail = (url: string, status: number, body: object | null = null, context?: HttpContext) => {
    client.get(url, { context }).subscribe({ error: () => {} });
    http.expectOne(url).flush(body, { status, statusText: 'Error' });
  };

  it('sends credentials only to the API', () => {
    client.get('/api/themes').subscribe();
    client.get('https://example.com').subscribe();
    expect(http.expectOne('/api/themes').request.withCredentials).toBe(true);
    expect(http.expectOne('https://example.com').request.withCredentials).toBe(false);
    http.match(() => true).forEach((r) => r.flush({}));
  });

  it('a 401 for a logged in user clears the session and goes to login', () => {
    const users = TestBed.inject(UserService);
    users.currentUser.set({ _id: '1' } as never);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    fail('/api/themes', 401, { message: 'Invalid token!' });
    expect(users.isLoggedIn()).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/login']);
  });

  it('shows the API error message', () => {
    fail('/api/themes', 409, { message: 'Already taken' });
    expect(TestBed.inject(NotificationService).current()).toEqual({
      text: 'Already taken',
      type: 'error',
    });
  });

  it('explains an unreachable server', () => {
    client.get('/api/themes').subscribe({ error: () => {} });
    http.expectOne('/api/themes').error(new ProgressEvent('error'), { status: 0 });
    expect(TestBed.inject(NotificationService).current()?.text).toContain('not reachable');
  });

  it('can skip the notification per request', () => {
    fail('/api/users/profile', 401, null, new HttpContext().set(SKIP_ERROR_NOTIFICATION, true));
    expect(TestBed.inject(NotificationService).current()).toBeNull();
  });
});
