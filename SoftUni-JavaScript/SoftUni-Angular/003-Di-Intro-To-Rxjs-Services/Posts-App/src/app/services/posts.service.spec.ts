import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Posts } from '../posts/posts';
import { LoggingService } from './logging.service';
import { PostsService } from './posts.service';

const URL = 'https://jsonplaceholder.typicode.com/posts';
const posts = Array.from({ length: 12 }, (_, i) => ({
  userId: 1,
  id: i + 1,
  title: `T${i + 1}`,
  body: '',
}));

describe('PostsService', () => {
  let http: HttpTestingController;
  let log: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    log = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LoggingService, useValue: { log } },
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('fetches posts and logs the count', () => {
    let result: unknown;
    TestBed.inject(PostsService)
      .getAllPosts()
      .subscribe((p) => (result = p));
    http.expectOne(URL).flush(posts);

    expect(result).toEqual(posts);
    expect(log).toHaveBeenCalledWith('Fetched 12 posts');
  });

  it('Posts component shows the first 10 posts', () => {
    const fixture = TestBed.createComponent(Posts);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading');

    http.expectOne(URL).flush(posts);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(10);
  });

  it('Posts component shows the error message', () => {
    const fixture = TestBed.createComponent(Posts);
    fixture.detectChanges();
    http.expectOne(URL).flush('boom', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error')).not.toBeNull();
  });
});
