import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let http: HttpTestingController;
  let users: UserService;
  const johny = { _id: '1', username: 'Johny', email: 'johny.doe@gmail.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
    users = TestBed.inject(UserService);
  });

  afterEach(() => http.verify());

  it('loadProfile restores the session, or stays a guest on error', () => {
    users.loadProfile().subscribe();
    http.expectOne('/api/users/profile').flush(johny);
    expect(users.currentUser()).toEqual(johny);

    users.loadProfile().subscribe();
    http.expectOne('/api/users/profile').flush(null, { status: 401, statusText: 'Unauthorized' });
    expect(users.isLoggedIn()).toBe(false);
  });

  it('login and logout update the current user', () => {
    users.login('johny.doe@gmail.com', '12345').subscribe();
    const req = http.expectOne('/api/login');
    expect(req.request.body).toEqual({ email: 'johny.doe@gmail.com', password: '12345' });
    req.flush(johny);
    expect(users.isLoggedIn()).toBe(true);

    users.logout().subscribe();
    http.expectOne('/api/logout').flush(null);
    expect(users.isLoggedIn()).toBe(false);
  });
});
