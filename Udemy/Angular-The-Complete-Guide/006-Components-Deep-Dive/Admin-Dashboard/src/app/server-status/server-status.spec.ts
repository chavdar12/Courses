import { TestBed } from '@angular/core/testing';
import { ServerStatus } from './server-status';

describe('ServerStatus', () => {
  afterEach(() => vi.useRealTimers());

  it('polls the status and stops when destroyed', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.7);
    const fixture = TestBed.createComponent(ServerStatus);
    fixture.detectChanges();
    expect(fixture.componentInstance.status()).toBe('online');

    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('offline');

    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
