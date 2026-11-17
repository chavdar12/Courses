import { TestBed } from '@angular/core/testing';
import { Counter } from './counter';
import { MessagesList } from './messages-list';
import { MessagesService } from './messages.service';
import { NewMessage } from './new-message';

describe('OnPush components', () => {
  afterEach(() => vi.useRealTimers());

  it('MessagesList updates through the async pipe', async () => {
    const fixture = TestBed.createComponent(MessagesList);
    await fixture.whenStable();
    TestBed.inject(MessagesService).add('hello');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('li').textContent).toBe('hello');
  });

  it('NewMessage ignores blank input and counts sent messages', async () => {
    const fixture = TestBed.createComponent(NewMessage);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input')!;
    input.value = '   ';
    el.querySelector('button')!.click();
    input.value = 'hi';
    el.querySelector('button')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.count')?.textContent).toBe('Sent: 1');
    expect(input.value).toBe('');
  });

  it('Counter re-renders after a timer because of the signal', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(Counter);
    fixture.componentInstance.later();
    vi.advanceTimersByTime(1000);
    vi.useRealTimers();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.value').textContent).toBe('1');
  });
});
