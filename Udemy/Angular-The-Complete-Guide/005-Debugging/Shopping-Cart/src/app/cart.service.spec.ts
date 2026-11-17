import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

const pen = { id: 2, name: 'Pen', price: 1.5 };

describe('CartService (regression tests for the debugged bugs)', () => {
  it('bumps the quantity when the same product is added again', () => {
    const cart = TestBed.inject(CartService);
    cart.add(pen);
    cart.add(pen);
    expect(cart.items()).toEqual([{ product: pen, quantity: 2 }]);
  });

  it('includes quantities in the total and drops removed lines', () => {
    const cart = TestBed.inject(CartService);
    cart.add(pen);
    cart.add(pen);
    cart.add({ id: 3, name: 'Ink', price: 2 });
    expect(cart.total()).toBe(5);
    cart.remove(2);
    expect(cart.total()).toBe(2);
  });
});
