import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authInterceptor, FAKE_JWT } from './auth.interceptor';
import { loggingInterceptor } from './logging.interceptor';
import { RequestLog } from './request-log';

describe('interceptors', () => {
  let http: HttpTestingController;
  let client: HttpClient;
  let log: RequestLog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
    log = TestBed.inject(RequestLog);
  });

  afterEach(() => http.verify());

  it('adds the bearer token and logs the request', () => {
    client.get('/api').subscribe();
    const req = http.expectOne('/api');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${FAKE_JWT}`);

    req.flush({});
    expect(log.entries()[0]).toMatch(/^GET \/api \(\d+ ms, Authorization: yes\)$/);
  });

  it('logs errors and still rethrows them', () => {
    let status = 0;
    client.get('/missing').subscribe({ error: (e) => (status = e.status) });
    http.expectOne('/missing').flush('', { status: 404, statusText: 'Not Found' });

    expect(status).toBe(404);
    expect(log.entries()).toContain('ERROR 404 GET /missing');
  });
});
