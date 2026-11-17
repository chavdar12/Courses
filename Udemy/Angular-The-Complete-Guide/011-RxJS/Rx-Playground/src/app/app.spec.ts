import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  afterEach(() => vi.useRealTimers());

  it('bridges signals and observables', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.countdown()).toBeUndefined();

    vi.advanceTimersByTime(2000);
    expect(app.seconds()).toBe(2);
    expect(app.countdown()).toBe(3);

    app.clicks.set(1);
    fixture.detectChanges(); // toObservable emits from an effect
    app.clicks.set(2);
    fixture.detectChanges();
    expect(app.doubledTotal()).toBe(0 + 2 + 4);

    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
