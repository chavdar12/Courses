import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService, Product } from './cart.service';
import { ErrorLog } from './error-log';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  template: `
    @if (errors.last(); as message) {
      <p role="alert">Something went wrong: {{ message }}</p>
    }
    <h1>Shop</h1>
    <ul class="products">
      @for (product of products; track product.id) {
        <li>
          {{ product.name }} – {{ product.price | currency: 'EUR' }}
          <button (click)="cart.add(product)">Add</button>
        </li>
      }
    </ul>
    <h2>Cart</h2>
    <ul class="cart">
      @for (line of cart.items(); track line.product.id) {
        <li>
          {{ line.quantity }} × {{ line.product.name }}
          <button (click)="cart.remove(line.product.id)">Remove</button>
        </li>
      } @empty {
        <li>Empty</li>
      }
    </ul>
    <p class="total">Total: {{ cart.total() | currency: 'EUR' }}</p>
    <button (click)="checkout()">Checkout</button>
  `,
})
export class App {
  protected readonly cart = inject(CartService);
  protected readonly errors = inject(ErrorLog);
  readonly products: Product[] = [
    { id: 1, name: 'Notebook', price: 4.5 },
    { id: 2, name: 'Pen', price: 1.2 },
  ];

  checkout() {
    if (this.cart.items().length === 0) throw new Error('The cart is empty');
  }
}
