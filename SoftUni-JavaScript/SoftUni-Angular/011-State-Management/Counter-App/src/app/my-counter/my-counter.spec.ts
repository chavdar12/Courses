import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { counterReducer } from '../state/counter.reducer';
import { MyCounter } from './my-counter';

describe('MyCounter', () => {
  it('dispatches actions and renders the store state', () => {
    TestBed.configureTestingModule({ providers: [provideStore({ count: counterReducer })] });
    const fixture = TestBed.createComponent(MyCounter);
    const counter = fixture.componentInstance;
    const text = () => {
      fixture.detectChanges();
      return fixture.nativeElement.textContent as string;
    };

    expect(text()).toContain('Current Count: 0');
    counter.increment();
    expect(text()).toContain('Current Count: 1');
    expect(text()).toContain('odd');
    counter.incrementBy(5);
    expect(text()).toContain('Current Count: 6');
    counter.decrement();
    counter.reset();
    expect(text()).toContain('Current Count: 0');
    expect(text()).toContain('even');
  });
});
