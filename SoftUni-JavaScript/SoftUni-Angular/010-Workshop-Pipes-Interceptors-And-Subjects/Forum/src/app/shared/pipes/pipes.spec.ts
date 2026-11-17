import { TestBed } from '@angular/core/testing';
import { ForumDatePipe } from './forum-date.pipe';
import { ShortenPipe } from './shorten.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

describe('pipes', () => {
  afterEach(() => vi.useRealTimers());

  it('shorten cuts at 25 symbols by default', () => {
    expect(new ShortenPipe().transform('a'.repeat(30))).toBe('a'.repeat(25) + '...');
    expect(new ShortenPipe().transform('short')).toBe('short');
  });

  it('forumDate formats as "dd MMM yyyy, HH:mm"', () => {
    const pipe = TestBed.runInInjectionContext(() => new ForumDatePipe());
    expect(pipe.transform(new Date(2020, 10, 7, 7, 19))).toBe('07 Nov 2020, 07:19');
  });

  it('timeAgo picks the largest fitting unit', () => {
    vi.useFakeTimers({ now: new Date('2026-11-14T12:00:00Z') });
    const pipe = new TimeAgoPipe();
    expect(pipe.transform('2026-11-14T11:59:30Z')).toBe('just now');
    expect(pipe.transform('2026-11-14T11:55:00Z')).toBe('5 minutes ago');
    expect(pipe.transform('2026-11-13T12:00:00Z')).toBe('yesterday');
    expect(pipe.transform('2020-11-07T07:19:59Z')).toBe('6 years ago');
  });
});
