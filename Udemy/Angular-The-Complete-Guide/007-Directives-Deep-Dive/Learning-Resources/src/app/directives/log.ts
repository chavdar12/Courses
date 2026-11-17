import { Directive, ElementRef, inject } from '@angular/core';

export const clicks: string[] = [];

// used as a host directive, so any component can opt in without template changes
@Directive({
  selector: '[appLog]',
  host: { '(click)': 'log()' },
})
export class Log {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  log() {
    clicks.push(this.el.nativeElement.tagName.toLowerCase());
  }
}
