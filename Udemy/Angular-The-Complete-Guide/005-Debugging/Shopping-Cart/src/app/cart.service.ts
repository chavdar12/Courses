import { Injectable, computed, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly lines = signal<CartLine[]>([]);
  readonly items = this.lines.asReadonly();
  // bug fixed while debugging: the total ignored quantities (sum of prices only)
  readonly total = computed(() =>
    this.lines().reduce((sum, l) => sum + l.product.price * l.quantity, 0),
  );

  add(product: Product) {
    // bug fixed while debugging: the same product was pushed twice instead of bumping its quantity
    this.lines.update((lines) =>
      lines.some((l) => l.product.id === product.id)
        ? lines.map((l) => (l.product.id === product.id ? { ...l, quantity: l.quantity + 1 } : l))
        : [...lines, { product, quantity: 1 }],
    );
  }

  remove(productId: number) {
    this.lines.update((lines) => lines.filter((l) => l.product.id !== productId));
  }
}
