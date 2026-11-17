import { ticker } from './ticker';

describe('ticker', () => {
  afterEach(() => vi.useRealTimers());

  it('emits the configured number of values and completes', () => {
    vi.useFakeTimers();
    const values: number[] = [];
    let done = false;
    ticker(100, 3).subscribe({ next: (v) => values.push(v), complete: () => (done = true) });
    vi.advanceTimersByTime(1000);
    expect(values).toEqual([1, 2, 3]);
    expect(done).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears the timer on unsubscribe', () => {
    vi.useFakeTimers();
    const sub = ticker(100, 10).subscribe();
    sub.unsubscribe();
    expect(vi.getTimerCount()).toBe(0);
  });
});
