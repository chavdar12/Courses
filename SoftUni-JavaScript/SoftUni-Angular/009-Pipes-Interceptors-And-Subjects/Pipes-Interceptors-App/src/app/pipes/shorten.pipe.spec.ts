import { ShortenPipe } from './shorten.pipe';

describe('ShortenPipe', () => {
  const pipe = new ShortenPipe();

  it('cuts long text at 10 symbols by default', () => {
    expect(pipe.transform('Angular pipes rock')).toBe('Angular pi...');
  });

  it('respects a custom limit and leaves short text alone', () => {
    expect(pipe.transform('Angular pipes rock', 7)).toBe('Angular...');
    expect(pipe.transform('short', 10)).toBe('short');
    expect(pipe.transform('exactly10!', 10)).toBe('exactly10!');
  });
});
