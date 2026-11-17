import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { ThemeService } from './theme.service';

describe('forum services', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('ThemeService sorts themes by subscribers, most first', () => {
    let names: string[] = [];
    TestBed.inject(ThemeService)
      .getThemes()
      .subscribe((t) => (names = t.map((x) => x.themeName)));
    http.expectOne('/api/themes').flush([
      { themeName: 'few', subscribers: ['a'] },
      { themeName: 'many', subscribers: ['a', 'b', 'c'] },
      { themeName: 'none', subscribers: [] },
    ]);
    expect(names).toEqual(['many', 'few', 'none']);
  });

  it('PostService asks for a limited number of recent posts', () => {
    TestBed.inject(PostService).getRecentPosts(3).subscribe();
    const req = http.expectOne((r) => r.url === '/api/posts');
    expect(req.request.params.get('limit')).toBe('3');
    req.flush([]);
  });
});
