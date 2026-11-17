import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ErrorLog } from './error-log';

describe('App', () => {
  it('adds products, shows the total and reports checkout errors', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    TestBed.configureTestingModule({
      providers: [{ provide: ErrorHandler, useExisting: ErrorLog }],
    });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const button = (text: string) =>
      [...el.querySelectorAll('button')].find((b) => b.textContent?.trim() === text)!;

    expect(() => fixture.componentInstance.checkout()).toThrow('The cart is empty');
    TestBed.inject(ErrorLog).handleError(new Error('The cart is empty'));
    fixture.detectChanges();
    expect(el.querySelector('[role=alert]')?.textContent).toContain('The cart is empty');

    button('Add').click();
    button('Add').click();
    fixture.detectChanges();
    expect(el.querySelector('.cart')?.textContent).toContain('2 × Notebook');
    expect(el.querySelector('.total')?.textContent).toContain('€9.00');
  });
});
