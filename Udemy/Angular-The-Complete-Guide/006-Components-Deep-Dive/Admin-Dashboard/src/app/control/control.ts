import { Component, contentChild, ElementRef, input } from '@angular/core';

// attribute selector + host bindings: <p appControl label="..."><input /></p>
@Component({
  selector: '[appControl]',
  host: { class: 'control', '(click)': 'focus()' },
  template: `
    <label>{{ label() }}</label>
    <ng-content select="input, textarea" />
  `,
})
export class Control {
  readonly label = input.required<string>();
  private readonly field =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('field');

  focus() {
    this.field()?.nativeElement.focus();
  }
}
