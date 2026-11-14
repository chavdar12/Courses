import { decrement, increment, incrementBy, reset } from './counter.actions';
import { counterReducer, initialState } from './counter.reducer';
import { selectIsEven } from './counter.selectors';

describe('counterReducer', () => {
  it('handles every action', () => {
    expect(counterReducer(initialState, increment())).toBe(1);
    expect(counterReducer(initialState, decrement())).toBe(-1);
    expect(counterReducer(3, incrementBy({ by: 5 }))).toBe(8);
    expect(counterReducer(42, reset())).toBe(0);
  });

  it('selectIsEven reflects the count', () => {
    expect(selectIsEven.projector(4)).toBe(true);
    expect(selectIsEven.projector(5)).toBe(false);
  });
});
