import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ImageUrlDirective } from './image-url.directive';

@Component({
  imports: [FormsModule, ImageUrlDirective],
  template: `<form><input name="imageUrl" ngModel appImageUrl /></form>`,
})
class Host {}

describe('ImageUrlDirective', () => {
  async function type(value: string) {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('input'));
    return { el: input.nativeElement as HTMLInputElement, model: input.injector.get(NgModel) };
  }

  it('marks a bad url invalid with a red border', async () => {
    const { el, model } = await type('not-a-url');
    expect(model.control.hasError('incorrect')).toBe(true);
    expect(el.style.borderLeft).toContain('rgb(169, 68, 66)');
  });

  it('accepts an http png url with a green border', async () => {
    const { el, model } = await type('https://x.com/me.png');
    expect(model.control.errors).toBeNull();
    expect(el.style.borderLeft).toContain('rgb(66, 169, 72)');
  });
});
